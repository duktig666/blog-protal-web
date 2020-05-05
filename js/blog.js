Vue.component('blog-message',{
    props: ['items'],
    template:`<div>
                <div class='blog-content' v-for="item in items">
                    <div>
                        <div class='title'><span>{{item.blog.title}}</span></div>
                        <p>{{item.blog.summary}}</p>
                    </div>
                    <div class='line'></div>
                    <div class='num'>
                        <!--  留言量 -->
                        <span v-test=''>
                            <i class='el-icon-chat-dot-round'></i>
                            {{item.blog.observeNumber}}
                        </span>
                        <!--  点赞量 -->
                        <span>
                            <i class='el-icon-star-off'></i>
                            {{item.blog.likeNumber}}
                        </span>
                        <!--  访问量 -->
                        <span>
                            <i class='el-icon-view'></i>
                            {{item.blog.visitNumber}}
                        </span>
                        <!--  发布时间 -->
                        <span>
                            <span>发布时间：{{item.blog.createDate}}</span>
                        </span>
                        <span class='more'>
                            <el-button type='primary' size='mini'>查看更多</el-button>
                        </span>
                    </div>
                </div>
            </div>
            `
})

