const Loadable = require('react-loadable');

import LoaderComponent from '../../components/shared/loader/LoaderComponent';

export default Loadable({
    loader: () => import('./AppContainer'),
    loading: () => LoaderComponent
});