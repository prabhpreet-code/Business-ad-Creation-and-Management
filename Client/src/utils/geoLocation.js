export function geoLocation(success,errors,options){
     if (navigator.geolocation) {
       navigator.permissions
         .query({ name: "geolocation" })
         .then(function (result) {
           console.log(result);
           if (result.state === "granted") {
             //If granted then you can directly call your function here
             navigator.geolocation.getCurrentPosition(success, errors, options);
           } else if (result.state === "prompt") {
             //If prompt then the user will be asked to give permission
             navigator.geolocation.getCurrentPosition(success, errors, options);
           } else if (result.state === "denied") {
             //If denied then you have to show instructions to enable location
           }
         });
     } else {
       console.log("Geolocation is not supported by this browser.");
     }
}