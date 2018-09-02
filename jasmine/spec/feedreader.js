/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* the test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have an URL', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* the test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    //test suite for the menu
    describe('The menu', function() {
        // Test ensures the menu element is hidden by default. 

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Test that ensures the menu changes visibility when the menu icon is clicked. 

        it('menu display when is clicked', function() {
            //first click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //second click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Test for Initial Entries 
    describe('Initial Entries', function() {

        /*  Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
    

        it('has a single entry', function() {
            let entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });
    /* Test for "New Feed Selection" */
    describe('New Feed Selection', function() {
        let firstFeed,
            secondFeed;

        // Test ensures when a new feed is loaded
        it('another feed section exists', function() {
            expect(allFeeds.length).toBeGreaterThan(1);
        });
        // Test for "Load another feed"
        describe('Load another feed', function() {

            beforeEach(function(done) {
                loadFeed(1, function() {
                    firstFeed = $('.feed').html();

                    loadFeed(0, function() {
                        secondFeed = $('.feed').html();
                        done();
                    });
                });
            });

            // two feed loaded
            it('feed section has been loaded and is different', function() {
                expect(firstFeed).not.toBe(secondFeed);
            });
        });
    });
});