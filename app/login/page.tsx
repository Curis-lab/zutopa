import LoginNav from "./login-nav";
import FormValidation from "./loginValidation";

const login = () => {
  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <FormValidation />
    </div>
  );
};

export default login;
