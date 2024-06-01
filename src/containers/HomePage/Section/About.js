import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về bệnh viện gia đình
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/qVQlc9fTbfk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
            Dưới bóng cây gia đình với hơn 27 năm lịch sử, Bệnh viện Gia Đình đã ghi dấu ấn là một điểm đến đáng tin cậy trong việc chăm sóc sức khỏe cho cả cộng đồng. Bằng sự tiên phong trong việc áp dụng các phương pháp điều trị hiện đại, không ngừng nỗ lực trong nghiên cứu và đào tạo, Bệnh viện Gia Đình không chỉ là nơi cung cấp dịch vụ y tế mà còn là biểu tượng của sự chăm sóc và hiểu biết.

Tại đây, chúng tôi không chỉ đơn thuần là bác sĩ và y tá mà còn là những người bạn đồng hành, luôn lắng nghe và thấu hiểu mọi nỗi lo lắng, mọi vấn đề sức khỏe của từng thành viên trong gia đình. Đồng thời, chúng tôi luôn đặt tiêu chuẩn cao về chất lượng dịch vụ và an toàn, để mọi bước tiến trong quá trình điều trị đều đảm bảo mang lại sự yên tâm và hài lòng tuyệt đối cho các gia đình. 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
