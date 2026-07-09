document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("message").innerText =
                "Login successful!";
        } else {
            document.getElementById("message").innerText =
                data.message || "Login failed";
        }

    } catch (error) {
        document.getElementById("message").innerText =
            "Server connection error";
    }
});