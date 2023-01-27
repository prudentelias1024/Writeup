import Button from "./Button";

export default function UserNav({hidden}){
    return(
        <>
       {
         hidden && hidden == true ? <div className="">
        
            <Button to="/login" name="Login" borderColor="border-none" textColor="text-blue-500"/>
            <Button to="/signup" name="Create an account" borderColor="border-pink-500" textColor="text-pink-500"/>
            </div> : null
        }
        </>
        
       
    );
}