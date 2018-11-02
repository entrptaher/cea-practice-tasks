module.exports = function cleaner(input) {
  // make shallow copy of input to remove reference
  input = JSON.parse(JSON.stringify(input));

  // clean up "css_args" as it takes a lot of useless space
  input.params.data.selectorArray.forEach((e, i, a) => {
    // modifies original array
    a[i].css_args = '';
  });

  // OUTPUT SCHEMA
  const output = {
    uuid: input.uuid,
    user: input.userID,
    content: '',
    scrapingStatus: '',
    data: {
      instanceInfo: {
        title: input.title,
        // move all these below to scraping-state instead?
        lastStartTime: input.lastStartTime,
        stream: '', // live streaming data, state and stream has same purpose?
        status: input.status,
        state: input.state,
        running: input.running, // state, status, running - three thing for same thing?
        spentCredits: 0, // must be updatable by admin?
        loop: {
          // move to scraping-state or pagination/deeplink related stuff instead?
          current: 0,
          total: 0,
        },
      },
      pageInfo: {
        url: input.params.url,
        urlPrefix: input.params.urlPrefix,
        editableUrl: input.params.editableUrl, // for extension usage
      },
      browserInfo: {
        userAgent: input.params.ua,
        viewportOptions: {
          width: input.params.width,
          height: input.params.height,
        },
      },
      scrapingInfo: {
        cacheImage: input.params.instanceOptions.cacheImage,
        selectorArray: [
          {
            title: input.params.data.selectorArray[0].field, // title of selector
            leaf: input.params.data.selectorArray[0].leaf, // .innerText, .src etc
            count: input.params.data.selectorArray[0].count,
            // how many are there from the current page
            selectedRejected: input.params.data.selectorArray[0].selectedrejectedjson,
            // for extension usage
            // NOTE: maybe use a better key name and encode the data
            css: {
              value: input.params.data.selectorArray[0].css,
              args: input.params.data.selectorArray[0].css_args,
              // NOTE: maybe use some hash instead of inner content
              parent: input.params.data.selectorArray[0].css_parent,
            },
            text: input.params.data.selectorArray[0].text,
          },
        ],
        scrappingType: input.params.data.scrappingType.type,
      },
      paginationInfo: {
        paginationMode: '',
        nextSelector: {
          value: input.params.data.next_selector,
          parent: input.params.data.next_selector_parent,
          count: input.params.data.next_selector_count,
          args: input.params.data.next_selector_args,
        },
        maxPages: input.params.data.max_pages,
        haltOnResult: input.params.data.HaltOnResult,
      },
      deeplinkInfo: {
        linkList: [],
        instance: '',
        field: '',
        searchFor: '',
      },
      actionInfo: {
        loginInfo: {
          authEnabled: input.params.loginInfo.auth_enabled,
          authField: input.params.loginInfo.auth_field,
          authUrl: input.params.loginInfo.auth_url,
          authUserField: input.params.loginInfo.auth_userField,
          authPasswordField: input.params.loginInfo.auth_passwordField,
          authClickBtn: input.params.loginInfo.auth_clickBtn,

          // Need to encrypt two-ways so it's not visible anywhere
          // except when the scraper reads it or the extension
          authUser: input.params.loginInfo.auth_user,
          authPassword: input.params.loginInfo.auth_password,
        },
        searchInfo: {
          searchEnabled: input.params.searchInfo.searchEnabled0,
          showSearchField: input.params.searchInfo.showSearchField, // for dashboard/extension usage
          searchUrl: input.params.searchInfo.searchUrl,
          searchField: input.params.searchInfo.searchField,
          searchText: input.params.searchInfo.searchText,
          searchBtn: input.params.searchInfo.searchBtn,
        },
      },
      scheduleInfo: {
        enabled: 0,
        interval: '',
        intervalText: '',
        intervalType: '',
      },
      resultAddons: {
        baseResultModifier: {
          sort: 0,
          deduplicate: 0,
          showOnlyOne: {
            enabled: 0,
            siteUrl: '',
            index: 0,
          },
        },
        filterInfo: {
          contentFilter: [
            {
              enabled: 0,
              group: '',
              id: '',
              data: '',
            },
          ],
        },
        rssCustomizationInfo: {
          properties: {
            title: '',
            description: '',
            image: '',
            link: '',
            author: '',
            comments: '',
            resultLimit: 0, // resultLimit sounds better?
          },
        },
      },
    },
  };

  return input;
};
