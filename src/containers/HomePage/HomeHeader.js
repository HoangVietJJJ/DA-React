import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholders: [
                'Tìm kiếm chuyên khoa',
                'Tìm kiếm bệnh viện',
                'Tìm kiếm phòng khám',
                'Tìm kiếm bác sĩ',
                // Thêm các giá trị placeholder khác nếu cần
            ],
            currentPlaceholderIndex: 0
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => ({
                currentPlaceholderIndex: (prevState.currentPlaceholderIndex + 1) % this.state.placeholders.length
            }));
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { placeholders, currentPlaceholderIndex } = this.state;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='subs-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='subs-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'><b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b></div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input type='text' placeholder={placeholders[currentPlaceholderIndex]}></input>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-clipboard-list"></i></div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vials"></i></div>
                                <div className='text-child'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-circle"></i></div>
                                <div className='text-child'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-meh"></i></div>
                                <div className='text-child'>Khám nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
