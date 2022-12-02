import { Button, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React from "react";
import "../styles/Contact.css";

function Contact() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [message, setMessage] = React.useState("");

	function encode(data) {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	}

	const handleSubmit = event => {
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact", name, email, message })
		})
			.then(() => alert("Message sent!"))
			.catch(error => alert(error));

		setName("");
		setEmail("");
		setMessage("");

		event.preventDefault();
	};

	return (
		<>
			<h1>Contact Me</h1>
			<div className="contact">
				<div className="form">
					<form onSubmit={handleSubmit} data-netlify="true" name="contact">
						<input type="hidden" name="form-name" value="contact" />
						<div>
							<TextField
								id="name-input"
								name="name"
								label="Name"
								type="text"
								value={name}
								onChange={e => setName(e.target.value)}
								variant="outlined"
								fullWidth
								margin="normal"
								required
								error={name === "" ? true : false}
								helperText={name === "" ? "Name is required" : ""}
							/>
						</div>
						<div>
							<TextField
								id="email-input"
								name="email"
								label="Email"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								variant="outlined"
								fullWidth
								margin="normal"
								required
								error={email === "" ? true : false}
								helperText={email === "" ? "Email is required" : ""}
							/>
						</div>
						<div>
							<TextField
								id="message-input"
								name="message"
								label="Message"
								type="text"
								value={message}
								onChange={e => setMessage(e.target.value)}
								variant="outlined"
								multiline
								fullWidth
								margin="normal"
								required
								error={message === "" ? true : false}
								helperText={message === "" ? "Message is required" : ""}
							/>
						</div>
						<div className="form-btn">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								fullWidth
								size="large"
								endIcon={<Send />}>
								Send
							</Button>
						</div>
					</form>
				</div>
				<div className="map">
					<iframe
						width="100%"
						height="100%"
						title="map"
						className="absolute inset-0"
						frameBorder={0}
						marginHeight={0}
						marginWidth={0}
						style={{ filter: "opacity(0.7)" }}
						src="https://www.google.com/maps/embed/v1/place?q=97+warren+st+new+york+city&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
					/>
				</div>
			</div>
		</>
	);
}

export default Contact;
