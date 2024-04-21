import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useState } from "react";
import { useForm } from "react-hook-form";

import ButtonIconInside from "../../ui/ButtonIconInside";
import { useSignup } from "./useSignup";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  const [password1Visible, setPassword1Visible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        multiChildren={true}
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type={password1Visible ? "text" : "password"}
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {/* <ButtonIconInside
          type="checkbox"
          onClick={(e) => {
            e.preventDefault();
            setPassword1Visible((value) => !value);
          }}
        >
          {password1Visible ? <HiEye /> : <HiEyeSlash />}
        </ButtonIconInside> */}
      </FormRow>

      <FormRow
        multiChildren={true}
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type={password2Visible ? "text" : "password"}
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
        {/* <ButtonIconInside
          type="checkbox"
          onClick={(e) => {
            e.preventDefault();
            setPassword2Visible((value) => !value);
          }}
        >
          {password2Visible ? <HiEye /> : <HiEyeSlash />}
        </ButtonIconInside> */}
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
