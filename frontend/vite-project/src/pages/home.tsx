import  { useState } from "react";
import { z } from "zod";

const LoginSignup = () => {
  const [state, setState] = useState("LOG IN TO YOUR ACCOUNT");
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Zod schema for validation
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"), // Email should be valid
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[a-zA-Z]/, "Password must contain letters")
      .regex(/[0-9]/, "Password must contain numbers"), // Password should have characters and numbers
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    try {
      loginSchema.parse({
        email: formData.email,
        password: formData.password,
      });
      setErrors({ email: "", password: "" });
      return true;
    } catch (err:any) {
      const validationErrors = err.errors.reduce((acc:any, currentError:any) => {
        acc[currentError.path[0]] = currentError.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
  };
  interface resData{
    success:boolean,
    token?:string
    errors?:string   
  }
  const login = async () => {
    if (validateForm()) {
      console.log("login executed", formData);

      
      let responseData: resData= {success:false};
      await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json())
        .then((data) => responseData = data);
        
      if (responseData.success && responseData.token) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/todos");
      } else {
        alert(responseData.errors);
      }
    }
  };

  const signup = async () => {
    if (validateForm()) {
      console.log("signup executed", formData);
      let responseData: resData= {success:false};

      await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json())
        .then((data) => responseData = data);

      if (responseData.success && responseData.token) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/todos");
      } else {
        alert(responseData.errors);
      }
    }
  };

  
    if (localStorage.getItem("auth-token") && localStorage.getItem("auth-token") !== "undefined"){
        console.log("alread login")
        window.location.replace("/todos");
    }else{
        console.log("pls login");
        
    }
  

  return (
    <div  className="login-container">
      <div className="login-section">
        <h2 className="subtext">{state}</h2>
        <form style={{ display: "block" }}>
          {state === "PERSONAL DETAILS" ? (
            <div className="form-group">
              <label className="subtext" htmlFor="text">FIRSTNAME</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" id="name" />
            </div>
          ) : <></>}
          {state === "PERSONAL DETAILS" ? (
            <div className="form-group">
              <label className="subtext" htmlFor="text">LASTNAME</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" id="name" />
            </div>
          ) : <></>}
          
          <div className="form-group">
            <label className="subtext" htmlFor="email">E-MAIL</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" id="login-email" />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label className="subtext" htmlFor="password">PASSWORD</label>
            <input name="password" value={formData.password} onChange={handleChange} type="password" id="login-password" />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          
          {state === "LOG IN TO YOUR ACCOUNT" ? (
            <button onClick={login} type="button" style={{ textAlign: "center" }} className="subtext login-button">LOG IN</button>
          ) : (
            <button onClick={signup} type="button" style={{ textAlign: "center" }} className="subtext login-button">REGISTER</button>
          )}
        </form>
      </div>

      {state === "LOG IN TO YOUR ACCOUNT" ? (
        <div className="register-section">
          <h2 className="subtext">NEED AN ACCOUNT?</h2>
          <button onClick={() => setState("PERSONAL DETAILS")} style={{ textAlign: "center" }} className="subtext register-button">REGISTER</button>
        </div>
      ) : (
        <div className="register-section">
          <h2 className="subtext">ALREADY HAVE AN ACCOUNT?</h2>
          <button onClick={() => setState("LOG IN TO YOUR ACCOUNT")} style={{ textAlign: "center" }} className="subtext register-button">LOG IN</button>
        </div>
      )}
    </div>
  );
}

export default LoginSignup;
