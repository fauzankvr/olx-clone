import { signInWithPopup } from "firebase/auth";
import "./Login.css"
import { doc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../../firebase/setup"; 

const Login = (props) => {

const googleSignin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });

    console.log("User logged in and data stored in Firestore");
  } catch (error) {
    console.error("Error during sign-in or saving user data:", error);
  }
};

   return (
     <div
       className="relative z-10"
       aria-labelledby="modal-title"
       role="dialog"
       aria-modal="true"
     >
       <div
         className="fixed inset-0 bg-gray-500/75 transition-opacity"
         aria-hidden="true"
       ></div>

       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
           <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
             <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
               <div className=" sm:items-start">
                 <h1 onClick={()=>props?.setLoginPop(false)} className="font-semibold text-3xl cursor-pointer">X</h1>
                 <div className="popcontiner mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                   <img className="popimg" src="https://statics.olx.in/external/base/img/loginEntryPointPost.png" alt="" />
                   <div className="mt-2 mb-2">
                     <p className="text-base font-medium" style={{textAlign:"center"}}>
                      Help us become one of the safest places <br />to buy and sell
                     </p>
                   </div>
                   <div className=" border-2 border-black p-2 rounded-md">
                     <button className="phonebtn" >
                     <svg width="22px" height="22px" viewBox="0 0 1024 1024" data-aut-id="icon" className="_2oC8g" fillRule="evenodd"><path className="rui-w4DG7 _3Z_D3" d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path></svg>
                     <span>Continue with Phone</span>
                     </button>
                   </div>
                    <div className=" border-2 border-black p-2 rounded-md mt-3 mb-5">
                     <button className="phonebtn" >
                    <svg version="1.1" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                     <span onClick={googleSignin}>Continue with Google</span>
                     </button>
                   </div>
                   <p className="text-xs mt-10 text-center">
                     All your personal details are safe with us. <br />
                     If you continue, you are accepting OLX Terms and <br /> Conditions and Privacy Policy
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default Login

