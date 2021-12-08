import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
/** this code is borrowed from https://github.com/gregnb/react-to-print. It worked fine in the beginning 
 * and then the reposistory owner converted the module to typescript which caused lots of trouble and bugs
 */
class ReactToPrint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
data:props.data

    }
  }
static propTypes = {
  /** Copy styles over into print window. default: true */
  copyStyles: PropTypes.bool,
  /** Trigger action used to open browser print */
  trigger: PropTypes.func.isRequired,
  /** Content to be printed */
  content: PropTypes.func.isRequired,
  /** Callback function to trigger before print */
  onBeforePrint: PropTypes.func,
  /** Callback function to trigger after print */
  onAfterPrint: PropTypes.func,
  /** Override default print window styling */
  pageStyle: PropTypes.string,
  /** Optional class to pass to the print window body */
  bodyClass: PropTypes.string,
};

static defaultProps = {
  bodyClass: '',
  copyStyles: true,
  onAfterPrint: undefined,
  onBeforePrint: undefined,
  pageStyle: undefined,
};


async  componentDidMount() {
 
}

reload=async()=> {
window.location.reload();
}
  removeWindow = (target) => {
    setTimeout(() => {
      target.parentNode.removeChild(target);
    }, 1500);
  }

  triggerPrint = (target) => {
    const { onBeforePrint, onAfterPrint } = this.props;

    this.setState({target})
    this.alertIfIeOrEdge(); 
    
    if (onBeforePrint) {
      onBeforePrint();
    }

    setTimeout(() => {
      
      target.contentWindow.focus();
      target.contentWindow.print();
      this.removeWindow(target);

      if (onAfterPrint) {
        onAfterPrint();
      }
    }, 1500);
  }

  handlePrint = () => {
    const isIE7 = window.navigator.userAgent.indexOf('Trident/7.0') > -1;
    const isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
    const isSpartan = window.navigator.userAgent.indexOf('Spartan') > -1;
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
    if (window.navigator.userAgent.indexOf('Mobile')>-1){

      alert("Vi kan se at du ser dit karakterark på en mobil enhed. Du kan kun se dine karakterer, ikke udskrive. Hvis du vil udskrive et officielt karakterark skal du gøre det fra en enhed med en større skærm såsom en Pc eller Mac");
    } 
 if(Screen.width<600){
  alert("Vi kan se at du ser dit karakterark på en mobil enhed. Du kan kun se dine karakterer, ikke udskrive. Hvis du vil udskrive et officielt karakterark skal du gøre det fra en enhed med en større skærm såsom en Pc eller Mac");
 }
    if (isIE === true) {
      alert("Internet Explorer kan ikke printe karakterark. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");
    }
    if (isIE7 === true) {
      alert("Internet Explorer kan ikke printe karakterark. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");
    }
    if (isEdge === true) {
      alert("Edge og Internet Explorer kan ikke printe karakterark med de nødvendige indstillinger. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");

    }
    if (isSpartan === true) {
      alert("Edge og Internet Explorer kan ikke printe karakterark med de nødvendige indstillinger. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");

    }
    else{
   
    const {
      bodyClass,
      content,
      copyStyles,
      pageStyle,
    } = this.props;

    const contentEl = content();
        if (contentEl === undefined) {
      console.error("Refs are not available for stateless components. For 'react-to-print' to work only Class based components can be printed"); // eslint-disable-line no-console
      return;
    }

    const printWindow = document.createElement('iframe');
   
    this.setState({ isLoading: false })
    printWindow.style.position = 'absolute';
    printWindow.style.top = '-1000px';
    printWindow.style.left = '-1000px';
   
    const contentNodes = findDOMNode(contentEl);
    const linkNodes = document.querySelectorAll('link[rel="stylesheet"]');

    this.linkTotal = linkNodes.length || 0;
    this.linksLoaded = [];
    this.linksErrored = [];

    const markLoaded = (linkNode, loaded) => {
      if (loaded) {
        this.linksLoaded.push(linkNode);
      } else {
        console.error("'react-to-print' was unable to load a link. It may be invalid. 'react-to-print' will continue attempting to print the page. The link the errored was:", linkNode); // eslint-disable-line no-console
        this.linksErrored.push(linkNode);
      }

      // We may have errors, but attempt to print anyways - maybe they are trivial and the user will
      // be ok ignoring them
      if (this.linksLoaded.length + this.linksErrored.length === this.linkTotal) {
        this.triggerPrint(printWindow);
      }
    };

    printWindow.onload = () => {
      /* IE11 support */
      if (window.navigator && window.navigator.userAgent.indexOf('Trident') > -1) {
        printWindow.onload = null;
      }
      

      const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
      const srcCanvasEls = [...contentNodes.querySelectorAll('canvas')];

      domDoc.open();
      domDoc.write(contentNodes.outerHTML);
      domDoc.close();
      /* remove date/time from top */
      const defaultPageStyle = pageStyle === undefined
        ? '@page { size: A4;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; }  .printSheet { overflow: none;  padding-bottom: 5cm !important;  -webkit-print-color-adjust :exact ; color-adjust: exact ; }.footerInSheet {display: inline;  clear: both;  position: absolute; top: 26cm; left: 1.5cm;flex-direction: row;color: #0B333C;}  thead { display: table-row-group; } .changeColor{color-adjust: exact;-webkit-print-color-adjust :exact } .changeColorIfEmptyGrade{color-adjust: exact ;-webkit-print-color-adjust :exact } tr { page-break-inside: avoid;line-height:1 ;text-align: left}  .footerafter {   position: relative; bottom: 30px; right: 30px; display: flex; justify-content: flex-start;  /* Update this */  } .page-break { page-break-before: always;}.page-break2 { page-break-after: always; }.page-break3 { page-break-after: auto;height:20px;} .page-break4 { page-break-before: always;}.noSeparatePage	{ display: none !important;  }.footer_tbody{white-space: pre;  line-height:1; overflow: visible;  text-overflow: ellipsis;  word-wrap: break-word; }.footerTable{white-space: pre; line-height:1; overflow: visible;  text-overflow: ellipsis; word-wrap: break-word; }table{  text-size-adjust: auto;line-height: 1.2;} tr{ line-height: 1.3;padding: 2px;}}': pageStyle;

      const styleEl = domDoc.createElement('style');
      styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
      domDoc.head.appendChild(styleEl);

      if (bodyClass.length) {
        domDoc.body.classList.add(bodyClass);
      }

      const canvasEls = domDoc.querySelectorAll('canvas');
      [...canvasEls].forEach((node, index) => {
        node.getContext('2d').drawImage(srcCanvasEls[index], 0, 0);
      });

      if (copyStyles !== false) {
        const headEls = document.querySelectorAll('style, link[rel="stylesheet"]');

        [...headEls].forEach((node, index) => {
          if (node.tagName === 'STYLE') {
            const newHeadEl = domDoc.createElement(node.tagName);

            if (node.sheet) {
              let styleCSS = '';

              for (let i = 0; i < node.sheet.cssRules.length; i++) {
                //catch 'member not found' error on cssText
                if (typeof node.sheet.cssRules[i].cssText === "string") {
                  styleCSS += `${node.sheet.cssRules[i].cssText}\r\n`;
                }
              }

              newHeadEl.setAttribute('id', `react-to-print-${index}`);
              newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
              domDoc.head.appendChild(newHeadEl);
            }
          } else {
            const attributes = [...node.attributes];

            const hrefAttr = attributes.filter(attr => attr.nodeName === 'href');
            const hasHref = hrefAttr.length ? !!hrefAttr[0].nodeValue : false;

            // Many browsers will do all sorts of weird things if they encounter an empty `href`
            // tag (which is invalid HTML). Some will attempt to load the current page. Some will
            // attempt to load the page's parent directory. These problems can cause
            // `react-to-print` to stop  without any error being thrown. To avoid such problems we
            // simply do not attempt to load these links.
            if (hasHref) {
              const newHeadEl = domDoc.createElement(node.tagName);

              attributes.forEach((attr) => {
                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
              });

              newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
              newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
              domDoc.head.appendChild(newHeadEl);
            } else {
              console.warn("'react-to-print' encountered a <link> tag with an empty 'href' attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:", node); // eslint-disable-line no-console
              markLoaded(node, true); // `true` because we've already shown a warning for this
            }
          }
        });
      }

      if (this.linkTotal === 0 || copyStyles === false) {
        this.triggerPrint(printWindow);
      }
    };

    document.body.appendChild(printWindow);
  }
  }
  setRef = (ref) => {
    this.triggerRef = ref;
  }
  

  alertIfIeOrEdge() {
    const isIE = window.navigator.userAgent.indexOf('Trident') > -1;
    const isIE7 = window.navigator.userAgent.indexOf('Trident/7.0') > -1;
    const isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
    const isSpartan = window.navigator.userAgent.indexOf('Spartan') > -1;
   
    if (isIE === true) {
      alert("Internet Explorer kan ikke printe karakterark. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");

    }
    if (isIE7 === true) {
      alert("Internet Explorer kan ikke printe karakterark. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");
   
    }
    if (isEdge === true) {
      alert("Edge og Internet Explorer kan ikke printe karakterark med de nødvendige indstillinger. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");
  //  this.reload();
    }
    if (isSpartan === true) {
      alert("Edge og Internet Explorer kan ikke printe karakterark med de nødvendige indstillinger. Brug f.eks. Chrome, Firefox, Opera eller Safari istedet for.");
    //  this.reload();
    }
   
  }
  
  render() {
    const {
      trigger,
    } = this.props;

    return React.cloneElement(trigger(), {
      onClick: this.handlePrint,
      ref: this.setRef,
    });
  }

}

export default ReactToPrint;