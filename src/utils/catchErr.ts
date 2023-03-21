export default ( fn : Function , errFn : Function ) : void  => {
    try {
        fn() ; 
    }
    catch ( err ) {
        console.log ( "There is an error : " , err ) ; 
        errFn() ; 
    }
}