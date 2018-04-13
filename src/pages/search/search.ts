import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { ContentService, ContentSearchCriteria } from "sunbird";
import { GenieResponse } from "../settings/datasync/genieresponse";
import { FilterPage } from "./filters/filter";
import { CourseDetailPage } from "../course-detail/course-detail";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: './search.html'
})
export class SearchPage {

  dialCode: string;

  dialCodeResult: Array<any> = [];

  dialCodeContentResult: Array<any> = [];

  showLoader: boolean = true;

  filterIcon = "./assets/imgs/ic_action_filter.png";

  constructor(private contentService: ContentService, private navParams: NavParams, private navCtrl: NavController) {
    this.dialCode = this.navParams.get('dialCode');
    this.getContentForDialCode()
  }


  openCollection(collection) {
    this.navCtrl.push(CourseDetailPage, {'content': collection})
  }


  openContent(collection, content) {
    if (collection !== undefined) {
      // this.navCtrl.push(CourseDetailPage, {'content': content});
    } else {
      this.navCtrl.push(CourseDetailPage, {'content': content});
    }
  }

  showFilter() {
    this.navCtrl.push(FilterPage);
  }


  private getContentForDialCode() {
    if (this.dialCode == undefined || this.dialCode.length == 0) {
      return
    }

    this.showLoader = true;

    let contentSearchRequest: ContentSearchCriteria = {
      dialCodes: [this.dialCode],
      mode: "collection"
    }

    this.contentService.searchContent(contentSearchRequest, (responseData) => {
      let response: GenieResponse = JSON.parse(responseData);
      console.log("result " + response);
      if (response.status && response.result) {
        this.processDialCodeResult(response.result);
      }

      this.showLoader = false;
    }, (error) => {
      this.showLoader = false;
    });
  }


  private processDialCodeResult(searchResult) {
    let collectionArray: Array<any> = searchResult.collectionDataList;
    let contentArray: Array<any> = searchResult.contentDataList;

    this.dialCodeResult = [];
    let addedContent = new Array<any>();

    if (collectionArray && collectionArray.length > 0) {
      collectionArray.forEach((collection) => {
        contentArray.forEach((content) => {
          if (collection.childNodes.includes(content.identifier)) {
            if (collection.content == undefined) {
              collection.content = [];
              collection.content.push(content);
            } else {
              collection.content.push(content);
            }

            addedContent.push(content.identifier);
          }
        })
        this.dialCodeResult.push(collection);
      })
    }

    this.dialCodeContentResult = [];

    if (contentArray && contentArray.length > 1) {
      contentArray.forEach((content) => {
        if (addedContent.indexOf(content.identifier) < 0) {
          this.dialCodeContentResult.push(content);
        }
      })
      return;
    }

    if (contentArray && contentArray.length == 1) {
      return;
    }
  }
}