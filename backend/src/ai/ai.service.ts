import { Injectable, Logger } from '@nestjs/common';

export interface ParsedJobListing {
  company: string;
  role: string;
  location: string | null;
  workMode: 'REMOTE' | 'HYBRID' | 'ONSITE' | null;
  companyType:
    | 'STARTUP'
    | 'SCALEUP'
    | 'CORPORATE'
    | 'CONSULTORA'
    | 'AGENCY'
    | null;
  salaryMin: number | null;
  salaryMax: number | null;
  skills: string[];
  source:
    | 'LINKEDIN'
    | 'INDEED'
    | 'INFOJOBS'
    | 'GLASSDOOR'
    | 'COMPANY_WEBSITE'
    | 'JOB_BOARD'
    | 'RECRUITER'
    | 'OTHER';
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey = process.env.GEMINI_API_KEY ?? '';
  private readonly apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  private async generate(prompt: string): Promise<string> {
    const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const error: unknown = await response.json();
      this.logger.error(`Gemini API error: ${JSON.stringify(error)}`);
      throw new Error('AI service unavailable');
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  }

  async parseJobListing(url: string): Promise<ParsedJobListing> {
    let pageContent: string;
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      pageContent = await response.text();
    } catch {
      throw new Error('Could not fetch the job listing URL');
    }

    const textContent = pageContent
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000);

    const prompt = `Analyze this job listing and extract the following information. Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation.

{
  "company": "company name",
  "role": "job title",
  "location": "city, country or null",
  "workMode": "REMOTE" or "HYBRID" or "ONSITE" or null,
  "companyType": "STARTUP" or "SCALEUP" or "CORPORATE" or "CONSULTORA" or "AGENCY" or null,
  "salaryMin": number or null (annual, in local currency),
  "salaryMax": number or null (annual, in local currency),
  "skills": ["skill1", "skill2", ...] (technical skills only, e.g. React, Python, AWS),
  "source": detect from URL - "LINKEDIN" if linkedin.com, "INDEED" if indeed.com, "INFOJOBS" if infojobs.net, "GLASSDOOR" if glassdoor.com, "COMPANY_WEBSITE" if company career page, "JOB_BOARD" for other job boards, "OTHER" if unknown
}

URL: ${url}

Job listing content:
${textContent}`;

    const result = await this.generate(prompt);

    try {
      const cleaned = result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned) as ParsedJobListing;

      return {
        company: parsed.company || 'Unknown',
        role: parsed.role || 'Unknown',
        location: parsed.location || null,
        workMode: ['REMOTE', 'HYBRID', 'ONSITE'].includes(
          parsed.workMode as string,
        )
          ? parsed.workMode
          : null,
        companyType: [
          'STARTUP',
          'SCALEUP',
          'CORPORATE',
          'CONSULTORA',
          'AGENCY',
        ].includes(parsed.companyType as string)
          ? parsed.companyType
          : null,
        salaryMin:
          typeof parsed.salaryMin === 'number' ? parsed.salaryMin : null,
        salaryMax:
          typeof parsed.salaryMax === 'number' ? parsed.salaryMax : null,
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        source: [
          'LINKEDIN',
          'INDEED',
          'INFOJOBS',
          'GLASSDOOR',
          'COMPANY_WEBSITE',
          'JOB_BOARD',
          'RECRUITER',
          'OTHER',
        ].includes(parsed.source)
          ? parsed.source
          : 'OTHER',
      };
    } catch {
      this.logger.error(`Failed to parse AI response: ${result}`);
      throw new Error('Could not parse the job listing');
    }
  }
}
