module.exports = {
    facebook: {
        appId: '559572681367596',
    },
    date: {
        format: 'd MMM Y',
    },
    timeFormat: 'HH:mm',
    googleRecaptchaSiteKey: '6Le9LcAUAAAAADYU_HaTTTmdqFJFCTobycJuyoG2',
    fallbackImage:
        'https://www.saedconnect.org/service-provider-directory/wp-content/themes/SAEDConnectTheme/images/heroes/noimage.png',
    vueCarousel: {
        perPage: 1,
        autoplay: true,
        paginationEnabled: false,
        navigationEnabled: true,
        loop: true,
    },
    eventsPerPage: 5,
    hrNewsPerPage: 12,
    booksPerPage: 12,
    magazinesPerPage: 12,
    webinarPerPage: 12,
    sliderConfig: {
        format: {
            to: function(value) {
                return parseInt(value);
            },
            from: function(value) {
                return parseInt(value);
            },
        },
    },
};
