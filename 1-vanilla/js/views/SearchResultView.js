import { qs } from "../helpers.js";
import View from "./View.js";

export default class SearchResultView extends View {
    constructor() {
        super(qs("#search-result-view"));

        this.template = new Template();
    }

    show(data = []) {
        if (data.length > 0) {
            this.element.innerHTML = this.template.getList(data);
        } else {
            this.element.innerHTML = this. template.getEmptyMessage();
        }

        super.show();
    }
}

class Template {
    
    getList(data = []) {
        return `
            <ul class="result">
                ${data.map(this._getItem).join("")}
            </ul>
        `
    }

    getEmptyMessage() {
        return `
            <div class="empty-box">검색결과가 없습니다.</div>
        `
    }

    _getItem({imageUrl, name}) {
        return `
            <li>
                <img src="${imageUrl}" alt="${name}" />
                <p>${name}</p>
            </li>
        `
    }

}
