module.exports = function formatJSON(data, filename) {
  let selectorArrays = [];
  (() => {
    data.params.data.selectorArray.map(el => {
      selectorArrays.push({
        "leaf": el.leaf, // .innerText, .src etc
        "count": el.count, // how many are there from the current page
        "selectedrejectedjson": el.selectedrejectedjson, // for extension usage
        "cssArgs": el.cssArgs,
        "cssParent": el.cssParent,
        "css": el.css,
        "field": el.field, // title of selector
      })
    })
  })();
  if(filename === "instance") {
    return {
      id: data.id,
      uuid: data.uuid,
      userID: data.userID,
      data: {
        instanceInfo: {
          title: data.title,
          lastStartTime: data.lastStartTime,
          // not found
          stream: "", // live streaming data
          status: data.status,
          state: data.state,
          running: data.running
        },
        pageInfo: {
          url: data.params.url,
          // not found
          urlPrefix: "",
          editableUrl: data.params.editableUrl // for extension usage
        },
        browserInfo: {
          userAgent: data.params.ua,
          viewportOptions: {
            width: data.params.width,
            height: data.params.height
          }
        },
        scrapingInfo: {
          selectorArray: selectorArrays,
          scrappingType: data.params.data.scrappingType
        },
        paginationInfo: {
          // All are not found
          paginationMode: "",
          nextSelector: data.params.data.next_selector,
          nextSelectorParent: data.params.data.next_selector_parent,
          nextSelectorCount: data.params.data.next_selector_count,
          nextSelectorArgs: data.params.data.next_selector_args,
          maxPages: data.params.data.max_pages,
          deeplinkSearchFor: data.params.data.deeplinkSearchFor,
          haltOnResult: data.params.data.HaltOnResult
        },
        deeplinkInfo: {
          linkList: data.params.data.link_list,
          deeplinkInstance: data.params.data.deeplinkInstance,
          deeplinkfield: data.params.data.deeplinkfield,
          deeplinkSearchFor: data.params.data.deeplinkSearchFor
        },
        actionInfo: {
          loginInfo: data.params.loginInfo,
          searchInfo: data.params.searchInfo
        },
        scheduleInfo: {
          enabled: data.scheduled.enabled,
          interval: data.scheduled.interval,
          intervalText: data.scheduled.intervalText,
          intervalType: ""
        },
        filterInfo: {
          contentFilter: [
            {
              filterEnabled: "",
              filtergroup: "",
              filterid: "",
              filterdata: ""
            }
          ]
        },
        rssCustomizationInfo: {
          properties: {
            title: data.title,
            description: "",
            image: "",
            link: data.params.url,
            author: "",
            comments: "",
            limitresult: ""
          }
        }
      }
    }
  } else if (filename === "content") {
    return {
      id: data._id,
      uuid: data.uuid,
      userID: data.userID,
      data: {
        json: data.content.json
      }
    };
  } else {
    return {
      id: data._id,
      uuid: data.uuid,
      userID: data.userID,
      data: data.content.deeplinkStatus
    };
  }
};