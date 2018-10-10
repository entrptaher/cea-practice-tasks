const instance = {
  id,
  uuid,
  userID,
  data: {
    instanceInfo: {
      title,
      lastStartTime,
      stream, // live streaming data
      status,
      state,
      running
    },
    pageInfo: {
      url,
      urlPrefix,
      editableUrl, // for extension usage
    },
    browserInfo: {
      userAgent,
      viewportOptions: {
        width,
        height
      }
    },
    scrapingInfo: {
      selectorArray: [
        {
          leaf, // .innerText, .src etc
          count, // how many are there from the current page
          selectedrejectedjson, // for extension usage
          cssArgs,
          cssParent,
          css,
          field, // title of selector
        }
      ],
      scrappingType
    },
    paginationInfo: {
      paginationMode,
      nextSelector,
      nextSelectorParent,
      nextSelectorCount,
      nextSelectorArgs,
      maxPages,
      deeplinkSearchFor,
      haltOnResult
    },
    deeplinkInfo: {
      linkList,
      deeplinkInstance,
      deeplinkfield,
      deeplinkSearchFor
    },
    actionInfo: {
      loginInfo: {
        authEnabled,
        authField,
        authUrl,
        authUserField,
        authPasswordField,
        authUser,
        authPassword,
        authClickBtn
      },
      searchInfo: {
        searchEnabled,
        showSearchField, // for dashboard/extension usage
        searchUrl,
        searchField,
        searchText,
        searchBtn
      }
    },
    scheduleInfo: {
      enabled,
      interval,
      intervalText,
      intervalType
    },
    filterInfo: {
      contentFilter: [
        {
          filterEnabled,
          filtergroup,
          filterid,
          filterdata
        }
      ]
    },
    rssCustomizationInfo: {
      properties: {
        title,
        description,
        image,
        link,
        author,
        comments,
        limitresult
      }
    }
  },
};

const content = {
  id,
  uuid,
  userID,
  data: {
    json
  }
};

const deeplinkStatus = {
  id,
  uuid,
  userID,
  data: {
    linkCount,
    lastUpdatedIndex,
    store
  }
};