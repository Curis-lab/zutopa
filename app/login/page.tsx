import FormValidation from "./loginValidation";

const login = () => {
  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <h2 className="text-5xl font-extralight ">Sign in</h2>
      <p>Sign in and start managing your conditatestion</p>
      <FormValidation />
    </div>
  );
};

export default login;
