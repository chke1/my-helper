<template>
  <c-card class="not-popular-label">
    <div>
      <details>
        <summary>Copyright 1999-2011.</summary>
        <p>- by Refsnes Data. All Rights Reserved.</p>
        <p>
          All content and graphics on this web site are the property of the company Refsnes Data.
        </p>
      </details>
    </div>

    <div>
      <section>
        <h1>WWF</h1>
        <p>The World Wide Fund for Nature (WWF) is....</p>
      </section>
    </div>

    <div>
      <p>这个文本包含 <sub>下标</sub>文本<sup>上标</sup>。</p>
    </div>

    <div>
      <ruby> 汉 <rp>(</rp><rt>Han</rt><rp>)</rp> 字 <rp>(</rp><rt>Zi</rt><rp>)</rp> </ruby>
    </div>

    <div>
      <p>
        WWF's goal is to:
        <q>Build a future where people live in harmony with nature.</q>
        We hope they succeed.
      </p>
    </div>

    <div>The<abbr title="World Health Organization ">WHO</abbr> was founded in 1948.</div>

    <div>
      <article>
        <h1>Internet Explorer 9</h1>
        <p>Windows Internet Explorer 9 (缩写为 IE9)在2011年3月14日21:00发布。</p>
      </article>
    </div>

    <div>
      <address>
        Written by <a href="mailto:webmaster@example.com">Jon Doe</a>.<br />
        Visit us at:<br />Example.com<br />Box 564, Disneyland<br />USA
      </address>
    </div>

    <div>
      <p>在下面的示例中,显示着每个用户比赛的分数。将用户名从周围的文本方向设置中隔离出来。</p>

      <ul>
        <li>用户 <bdi>hrefs</bdi>: 60 分</li>
        <li>用户 <bdi>jdoe</bdi>: 80 分</li>
        <li>用户 <bdi>إيان</bdi>: 90 分</li>
      </ul>

      <p><b>注意：</b> 目前只有 Firefox 和 Chrome 浏览器支持 bdi 标签。</p>
    </div>

    <div>
      <p>该段落文字从左到右显示</p>
      <p><bdo dir="rtl">该段落文字从右到左显示</bdo></p>
    </div>

    <div>
      <figure>
        <figcaption>Fig1. - A view of the pulpit rock in Norway.</figcaption>
      </figure>
    </div>

    <div>
      <hgroup>
        <h1>Welcome to my WWF</h1>
        <h2>For a living planet</h2>
      </hgroup>

      <p>The rest of the content...</p>
    </div>

    <div>
      <p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
    </div>

    <div>
      <map name="planetmap">
        <area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun" />
        <area shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury" />
        <area shape="circle" coords="124,58,8" href="venus.htm" alt="Venus" />
      </map>
    </div>

    <div>
      <fieldset style="padding: 30px">
        <legend>分组框</legend>
      </fieldset>
    </div>
  </c-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-popular-label {
  & > div {
    margin-bottom: 20px;
    background-color: #f1f1f1;
    padding: 12px;
    box-sizing: border-box;
    font-style: italic;
  }

  * {
    line-height: 22px;
  }
}
</style>
