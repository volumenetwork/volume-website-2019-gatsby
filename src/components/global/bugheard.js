import React from 'react'
import Helmet from 'react-helmet'

const Bugheard = () => (
  <Helmet>
    <script type="text/javascript">
      {`
        (function (d, t) {
        var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
        bh.type = 'text/javascript';
        bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=y3mfxygi2eblmkhixfvxgw';
        s.parentNode.insertBefore(bh, s);
        })(document, 'script');
      `}
    </script>
  </Helmet>
)

export default Bugheard
