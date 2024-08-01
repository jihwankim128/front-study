import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView, tabView, keywordListView}) {
    this.store = store;
    
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView
    .on('@submit', (event) => this.search(event.detail.value))
    .on('@reset', () => this.reset());

    this.tabView
    .on('@tabchange', (event) => {this.select(event.detail.tab);});

    this.keywordListView
    .on("@click", (event) => this.search(event.detail.value));
  }

  select(tab) {
    this.store.select(tab);
    this.renderTab();
  }

  search(keyword) {
    this.store.search(keyword);
    this.render();
  }

  reset() {
    this.store.reset();
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.renderTab();
    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.tabView.hide();
    this.keywordListView.hide();
    this.searchResultView.show(this.store.searchResult);
  }

  renderTab() {
    this.tabView.show(this.store.selectedTab);
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide();
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }

}
