/*** @jsx React.DOM */

var React = require("react");

var GroupEventDataSection = require("../eventDataSection");
var PropTypes = require("../../../proptypes");

var RequestInterface = React.createClass({
  propTypes: {
    group: PropTypes.Group.isRequired,
    event: PropTypes.Event.isRequired,
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
  },

  render: function(){
    var group = this.props.group;
    var evt = this.props.event;
    var data = this.props.data;

    var fullUrl = data.url;
    if (data.query_string) {
      fullUrl = fullUrl + '?' + data.query_string;
    }
    if (data.fragment) {
      fullUrl = fullUrl + '#' + data.fragment;
    }

    var headers = [];
    for (var key in data.headers) {
      headers.push(<dt key={'dt-' + key }>{key}</dt>);
      headers.push(<dd key={'dd-' + key }><pre>{data.headers[key]}</pre></dd>);
    }

    // lol
    var parsedUrl = document.createElement("a");
    parsedUrl.href = fullUrl;

    var title = (
      <h3>
        <strong>{data.method || 'GET'} <a href={fullUrl}>{parsedUrl.pathname}</a></strong>
        <div className="pull-right">{parsedUrl.hostname}</div>
      </h3>
    );

    return (
      <GroupEventDataSection
          group={group}
          event={evt}
          type={this.props.type}
          wrapTitle={false}
          title={title}>
        <table className="table vars">
          <colgroup>
            <col style={{width: "130"}} />
          </colgroup>
          <tbody>
            {data.query_string &&
              <tr>
                <th>Query:</th>
                <td className="values">
                  <pre>{data.query_string}</pre>
                </td>
              </tr>
            }
            {data.fragment &&
              <tr>
                <th>Fragment:</th>
                <td className="values">
                  <pre>{data.fragment}</pre>
                </td>
              </tr>
            }
            {data.data &&
              <tr>
                <th>Body:</th>
                <td className="values">
                  <pre>{JSON.stringify(data.body, null, 2)}</pre>
                </td>
              </tr>
            }
            {data.cookies &&
              <tr>
                <th>Cookies:</th>
                <td className="values">
                  <pre>{JSON.stringify(data.cookies, null, 2)}</pre>
                </td>
              </tr>
            }
          </tbody>
        </table>
          {headers &&
            <div className="box-collapsible">
              <div className="section-toggle">
                <div className="pull-right">
                  <span className="icon-arrow-up"></span>
                  <span className="icon-arrow-down"></span>
                </div>
                <h5>Headers</h5>
              </div>
              <dl className="vars">
                {headers}
              </dl>
            </div>
          }
          {data.env &&
            <tr>
              <th>Environment:</th>
              <td className="values">
                <pre>{JSON.stringify(data.env, null, 2)}</pre>
              </td>
            </tr>
          }
      </GroupEventDataSection>
    );
  }
});

module.exports = RequestInterface;