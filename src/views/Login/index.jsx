import React, { useState, useEffect } from "react";
import "./index.scss";
import "./alo.css";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { signIn, loginSocial } from "../../lib/api";
import firebase from "../../firebase"

const Login = ({ history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false)
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState('')

  let uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        setEmail(user.email)
        setDisplayName(user.displayName)
        setUid(user.uid)
        const data = { uid, email, displayName }
        if (uid !== '') {
          loginSocial(data).then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('authSocialID', res.data.user.authSocialID)
            localStorage.setItem('userId', res.data.user._id)
            history.push('/')
          })
        }
      }
    });
    // return () => { };
  }, [uid])

  //fuction
  const getName = (e) => {
    setName(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: name,
      password,
    };
    signIn(data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        history.push("/");
      })
      .catch((res) => {
        console.log(res);
        setCheck(true);
      });
  };
  return (
    <div className="login">
      <div className="container px-4 h-full">
        <div className="flex content-center items-center justify-center h-full py-4">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={onSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      onChange={getName}
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={getPassword}
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700">
                        Remember me
                      </span>
                    </label>
                    {check === true ? (
                      <div>*User Name or Password are incorrect</div>
                    ) : (
                        <div></div>
                      )}
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                    <StyledFirebaseAuth
                      uiConfig={uiConfig}
                      firebaseAuth={firebase.auth()}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-xl"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/register" className="text-xl">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
