
document.addEventListener('DOMContentLoaded', function () {

  //Deletion handling logic
  const cancelIcons = document.querySelectorAll('.CancelIcon');
  cancelIcons.forEach(cancelIcon => {
    cancelIcon.addEventListener('click', async function () {
      // Retrieve the EmpId value from the data-empid attribute
      const empId = this.getAttribute('data-empid');
      
      // Use the empId value as needed
      alert(`Are you sure you want to delete the employee with employeeId:${empId}`);

      const deleteurl=`http://localhost:3000/api/delete?`+new URLSearchParams({empId});
      try{
        const response=await fetch(deleteurl,{
          method : 'DELETE',
        });
        if(response.ok)
        {
          const result=await response.json();
          if(result)
          {
            alert("Employee record deleted successfully");
            location.reload();
          }
        }
        else
          console.error(`Error deleting record. Status: ${response.status}`);
      }
      
      catch(err){
        console.log(err);
      }
     
    });
  });
  ///End of Deletion handling logic

  ///Start of Image upload and preview logic
  const previewImage=document.querySelector('#InputImage');
   //console.log('PreviewImage',previewImage);
   previewImage&&previewImage.addEventListener('change',(eve)=>
   {
    //console.log('Onchange event called');
    if(eve.target.files.length > 0){
      var src = URL.createObjectURL(eve.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
   });

   //End of Image upload and preview logic

   // Start of Update  record logic
    const updateuserformDOM=document.querySelector('#update_userform')
    
    updateuserformDOM&&updateuserformDOM.addEventListener('submit',function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Extract form data
        const formData = new FormData(event.target);
        // Log the form data (you can do other processing here)
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });

        // Log the form data (you can do other processing here)
        const jsonData = JSON.stringify(formObject);
        const updateurl='http://localhost:3000/api/updateuser'
        fetch(updateurl,{
          method : "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: jsonData
        }).then(response=>response.json()).then(data=>alert("Employee record updated succesfully")).catch(err=>console.log(err))
    });
   //End of Update record logic

   //Start of Alerting having same emails logic

   const inputemail=document.querySelector('input[type=email]')
   const buttonele=document.querySelector('button');
   buttonele.addEventListener('click',function(eve)
   {
    console.log('I am clicked');
    // eve.preventDefault();
    // fetch('http://localhost:3000/api/dupicateemail')
   }
   )
})