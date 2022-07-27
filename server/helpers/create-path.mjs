import path from 'path';

const createPath = (page) => path.resolve(__dirname,'dist',`${page}.html`);

export default createPath;