fetch("http://localhost:5000/courses").then((res) => res.json()).then((data) => {
    console.log(data);
})