export default {

    showLoginModal(state)
    {
        state.showLoginModal = true;
    },

    hideLoginModal(state)
    {
        state.showLoginModal = false;
    },

    showForgotPasswordModal(state)
    {
        state.showForgotPasswordModal = true;
    },

    hideForgotPasswordModal(state)
    {
        state.showForgotPasswordModal = false;
    },

    showSignupModal(state)
    {
        state.showSignupModal = true;
    },

    hideSignupModal(state)
    {
        state.showSignupModal = false;
    },

    showGalleryModal(state)
    {
        state.showGalleryModal = true;
    },

    hideGalleryModal(state)
    {
        state.showGalleryModal = false;
    },

    showGenericModal(state, data)
    {
        state.genericModalData = {
            show: true,
            title: data.title,
            content: data.content,
            large: data.large
        }
    },

    hideGenericModal(state) 
    {
        state.genericModalData = {
            show: false,
            title: null,
            content: ''
        }
    }


};