import { useState } from "react";
import "./sign-in-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  logInWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await logInWithEmailAndPassword(email, password);
      console.log(user);

      console.log("User logged in successfully");

      resetFormFields();
    } catch (error) {
      console.log("Failed to login.", error);
    }
  };

  const signInWithGoogle = async () => {
    // from the response of signInWithGoogle() I am destructuring the response to get object user only
    // user I am then passing it to the function createUserDocumentFromAuth = async (userAuth)
    // that will tell me if the user exists or not using the userSnapshot.exists()
    await signInWithGooglePopup();
    
  };

  return (
    <div>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form className="sign-in-container" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
