export const Loader = () => {
	return (
		<div className="loader vw-100 vh-100 d-flex justify-content-center align-items-center position-absolute">
			<div className="spinner-border text-primary p-4 fs-1" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};
