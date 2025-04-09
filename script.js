function goToNextPage() {
    const name = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const ssn = document.getElementById('ssn').value;
  
    if (name && dob && ssn) {
      const queryString = `?name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}&ssn=${encodeURIComponent(ssn)}`;
      window.location.href = `next.html${queryString}`;
    } else {
      alert('Please fill out all fields.');
    }
  }