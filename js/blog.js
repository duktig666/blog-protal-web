Vue.component('blog-message',{
    props: ['items'],
    template:`<div>
                <div class='blog-content' v-for="item in items">
                    <div>
                        <div class='title'><span>{{item.title}}</span></div>
                        <p class="txt">{{item.summary}}</p>
                    </div>
                    <div class='line'></div>
                    <div class='num'>
                        <!--  留言量 -->
                        <span>
                            <i class='el-icon-chat-dot-round'></i>
                            {{item.observeNumber}}
                        </span>
                        <!--  点赞量 -->
                        <span>
                            <i class='el-icon-star-off'></i>
                            {{item.likeNumber}}
                        </span>
                        <!--  访问量 -->
                        <span>
                            <i class='el-icon-view'></i>
                            {{item.visitNumber}}
                        </span>
                        <!--  发布时间 -->
                        <span>
                            <span>发布时间：{{item.createDate}}</span>
                        </span>
                        <span class='more'>
                            <el-button type='primary' size='mini' @click="findBlogDetail(item.id)">查看更多</el-button>
                        </span>
                    </div>
                </div>
            </div>
            `,
    methods:{
        findBlogDetail(blogId){
            window.open("../html/blog-detail.html?"+blogId);
        }
    }
});

