const forgotPasswordLink = document.getElementById('buttone');

forgotPasswordLink.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  forgetPassword(email);
  email.value = ""
});

const forgetPassword = async (email) => {
  try {
    const response = await axios.post('http://localhost:3000/api/nodemail/forget', { email });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
