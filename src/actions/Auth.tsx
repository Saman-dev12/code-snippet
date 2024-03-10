"use server"
export const loginHandler = async(formData: FormData) => {
    console.log(formData.get('email'), formData.get('password'));
}

export const signupHandler = async(formData: FormData) => {
    console.log(formData.get('username'),formData.get('email'), formData.get('password'));
}
