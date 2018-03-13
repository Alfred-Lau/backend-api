module.exports = {
    initProfileListData : () => {
        const listData = [];
        for (let i = 0; i < 15; i++) {
            listData.push({
                key:i,
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
            });
        }
        return listData;
    }};
