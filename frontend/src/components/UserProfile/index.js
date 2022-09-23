import UserInfo from "../UserInfo";
import UserPosts from "../UserPosts";

const UserProfile = () => {
  return (
    <>
      <section>
        <UserInfo />
      </section>
      <section>
        <UserPosts />
      </section>
    </>
  );
};

export default UserProfile;
