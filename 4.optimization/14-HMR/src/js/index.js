import print from './print.js';
import '../css/iconfont.css';
import '../css/index.less';

document.getElementById('test').innerText = 'basic webpack environment test';

print();

// setting HMR
if (module.hot) {
    module.hot.accept('./print.js', () => {
        print();
    });
}
