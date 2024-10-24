import React from "react";
import "./UserAdminDashboard.css";

const CreateUser = ({ toggleFormVisibility }) => {
	return (
		<div>
			<div className="userFormContainer">
				<h4>Create User</h4>
				<button onClick={toggleFormVisibility} style={{}}>
					Close
				</button>

				<form className="createUserForm" action="#">
					<div>
						<span>Full Name</span>
						<input type="text" name="fullName" />
					</div>
					<div>
						<span>Email</span>
						<input type="text" name="email" />
					</div>
					<div>
						<span>Password</span>
						<input type="text" name="password" />
					</div>
					<div>
						<span>Role</span>
						<input type="text" name="userRole" />
					</div>
					<input type="submit" value="Add" id="submitCreateUser" />
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
