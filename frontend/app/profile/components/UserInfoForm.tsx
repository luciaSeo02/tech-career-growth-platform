import { PartialUser } from "@/types/user";
import { FieldErrors } from "../hooks/useProfileForm";

type Props = {
  isEditing: boolean;
  user: { name: string | null; email: string };
  editingUser: PartialUser;
  setEditingUser: (u: PartialUser) => void;
  fieldErrors: FieldErrors;
};

export default function UserInfoForm({
  isEditing,
  user,
  editingUser,
  setEditingUser,
  fieldErrors,
}: Props) {
  return (
    <section>
      <h2>User Info</h2>
      <div>
        <label>Name: </label>
        {isEditing ? (
          <>
            <input
              type="text"
              style={fieldErrors.name ? { borderColor: "red" } : {}}
              value={editingUser.name ?? ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            {fieldErrors.name && (
              <small style={{ color: "red" }}> {fieldErrors.name}</small>
            )}
          </>
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        {isEditing ? (
          <>
            <input
              type="email"
              style={fieldErrors.email ? { borderColor: "red" } : {}}
              value={editingUser.email ?? ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            {fieldErrors.email && (
              <small style={{ color: "red" }}> {fieldErrors.email}</small>
            )}
          </>
        ) : (
          <span>{user.email}</span>
        )}
      </div>
    </section>
  );
}
