import app from 'flarum/forum/app';
import extendSearch from './components/CustomSearch';

app.initializers.add('nopj/custom-search', () => {
  extendSearch();
});
