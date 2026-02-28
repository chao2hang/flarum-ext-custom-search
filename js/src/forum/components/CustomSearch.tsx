import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import Search from 'flarum/forum/components/Search';
import Select from 'flarum/common/components/Select';
import ItemList from 'flarum/common/utils/ItemList';
import icon from 'flarum/common/helpers/icon';

export default function extendSearch() {
  // Initialize searchEngine property
  extend(Search.prototype, 'oninit', function () {
    this.searchEngine = 'bing';
  });

  // Override view to add the engine selector
  override(Search.prototype, 'view', function (original) {
    const vnode = original();
    
    // Find the Search-input div in the children
    const searchInput = vnode.children.find((c: any) => c && c.attrs && c.attrs.className && c.attrs.className.includes('Search-input'));
    
    if (searchInput) {
      if (!Array.isArray(searchInput.children)) {
        searchInput.children = [searchInput.children];
      }

      // Prepend the engine selector
      searchInput.children.unshift(
        <div className="Search-engine-selector">
          <Select
            options={{
              google: 'Google',
              bing: 'Bing'
            }}
            value={this.searchEngine}
            onchange={(value: string) => {
              this.searchEngine = value;
              m.redraw();
            }}
          />
        </div>
      );

      // Add a search button at the end
      searchInput.children.push(
        <button
          className="Button Button--link Search-button"
          onclick={(e: Event) => {
            e.preventDefault();
            this.selectResult();
          }}
          type="button"
        >
          {icon('fas fa-search')}
        </button>
      );
    }

    return vnode;
  });

  // Override selectResult to redirect to external search engine
  override(Search.prototype, 'selectResult', function (original) {
    const query = this.searchState.getValue();
    if (!query || query.length < 1) return;

    const baseUrl = new URL(app.forum.attribute('baseUrl')).hostname;
    const searchQueries: Record<string, string> = {
      google: `https://www.google.com/search?q=site:${baseUrl}%20${encodeURIComponent(query)}`,
      bing: `https://www.bing.com/search?q=site:${baseUrl}%20${encodeURIComponent(query)}`
    };

    window.open(searchQueries[this.searchEngine], '_blank');
    this.clear();
    this.$('input').blur();
  });

  // Empty sourceItems to stop Flarum's internal search from showing results
  override(Search.prototype, 'sourceItems', function () {
    return new ItemList();
  });
}
