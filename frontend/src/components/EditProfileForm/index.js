import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../Contexts/TokenContext";
import Avatar from "../Avatar";

const EditProfileForm = (user, setUser, setShowEditForm) => {
  const {
    name: currentName,
    lastname: currentLastname,
    bio: currentBio,
    url: currentUrl,
    privacy: currentPrivacy,
    password: currentPassword,
    avatar: currentAvatar,
    username: currentUsername,
    email: currentEmail,
  } = user;

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPrivacy, setNewPrivacy] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newAvatarPreview, setNewAvatarPreview] = useState("");

  const newAvatarRef = useRef();

  const { token } = useTokenContext();

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const file = newAvatarRef.current.files[0];

          if (
            !(
              newUsername ||
              newEmail ||
              file ||
              newPassword ||
              newName ||
              newLastname ||
              newBio ||
              newUrl ||
              newPrivacy
            )
          ) {
            toast.warn("No has introducido ningún dato nuevo");
            return;
          }

          if (
            newUsername ||
            newEmail ||
            file ||
            newPassword ||
            newName ||
            newLastname ||
            newBio ||
            newUrl ||
            newPrivacy
          ) {
            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/user/data`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  username: newUsername,
                  email: newEmail,
                  bio: newBio,
                  url: newUrl,
                  name: newName,
                  lastname: newLastname,
                  privacy: newPrivacy,
                  password: newPassword,
                }),
              }
            );
            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }
            setUser({
              ...user,
              username: newUsername || user.username,
              email: newEmail || user.email,
              name: newName || user.name,
              lastname: newLastname || user.lastname,
              bio: newBio || user.bio,
              url: newUrl || user.url,
              privacy: newPrivacy || user.privacy,
              password: newPassword || user.password,
            });
          }

          if (file) {
            const formData = new FormData();

            formData.append("avatar", file);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/user/avatar`,
              {
                method: "PUT",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            const avatar = body.data.avatarName;

            setUser({ ...user, avatar });
          }

          toast.success("Perfil de Hack a Gram actualizado con éxito");
          setShowEditForm(false);
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="avatar">
        {!newAvatarPreview && (
          <Avatar avatar={currentAvatar} username={currentUsername} />
        )}

        {newAvatarPreview && (
          <img src={newAvatarPreview} alt={currentUsername} />
        )}
      </label>
      <input
        id="avatar"
        type="file"
        hidden
        ref={newAvatarRef}
        onChange={() => {
          const file = newAvatarRef.current.files[0];

          setNewAvatarPreview(URL.createObjectURL(file));
        }}
      />

      <label htmlFor="username">Nombre de usuario:</label>
      <input
        id="username"
        value={newUsername}
        onChange={(event) => {
          setNewUsername(event.target.value);
        }}
        placeholder={currentUsername}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={newEmail}
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
        placeholder={currentEmail}
      />

      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        value={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        placeholder={currentName}
      />

      <label htmlFor="lastname">Apellido/Apellidos:</label>
      <input
        id="lastname"
        value={newLastname}
        onChange={(event) => {
          setNewLastname(event.target.value);
        }}
        placeholder={currentLastname}
      />

      <label htmlFor="bio">Bio:</label>
      <input
        id="bio"
        value={newBio}
        onChange={(event) => {
          setNewBio(event.target.value);
        }}
        placeholder={currentBio}
      />

      <label htmlFor="url">URL:</label>
      <input
        id="url"
        value={newUrl}
        onChange={(event) => {
          setNewUrl(event.target.value);
        }}
        placeholder={currentUrl}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        value={newPassword}
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
        placeholder={currentPassword}
      />

      <label htmlFor="privacy">Privacidad:</label>
      <input type="radio" id="privacy" value="public" />
      <label htmlFor="privacy">Público</label>
      <input type="radio" id="privacy" value="private" />
      <label htmlFor="privacy">Privado</label>

      <button>Actualizar perfil</button>
    </form>
  );
};

export default EditProfileForm;
