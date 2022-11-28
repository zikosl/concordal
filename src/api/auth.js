


const AuthProvider = {
    login: async ({ email, providerName }) => {
        if (providerName === "google") {
            window.location.href =
                "https://accounts.google.com/o/oauth2/v2/auth";
            return Promise.resolve(false);
        }

        if (providerName === "github") {
            window.location.href =
                "https://github.com/login/oauth/authorize";
            return Promise.resolve(false);
        }

        if (email) {
            localStorage.setItem("email", email);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    register: (params) => {
        if (params.email && params.password) {
            localStorage.setItem("email", params.email);
            return Promise.resolve();
        }
        return Promise.reject();
    },
    updatePassword: (params) => {
        if (params.newPassword) {
            //we can update password here
            return Promise.resolve();
        }
        return Promise.reject();
    },
    forgotPassword: (params) => {
        if (params.email) {
            //we can send email with forgot password link here
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("email");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("email")
            ? Promise.resolve()
            : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};

export default AuthProvider;