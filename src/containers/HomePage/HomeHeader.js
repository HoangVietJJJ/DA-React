import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

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

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux actions
    }

    render() {
        const { placeholders, currentPlaceholderIndex } = this.state;
        let language = this.props.language;
        console.log('check language : ', language)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div> <i className="fas fa-bars" /></div>

                            <div><img className='header-logo' src={logo} /></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.search-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-clinic" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.choose-a-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.packages" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.general" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" /></div>
                        <div className='title2'><b><FormattedMessage id="banner.title2" /></b></div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input type='text' placeholder={placeholders[currentPlaceholderIndex]}></input>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.specialist" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.remote" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-clipboard-list"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.generality" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vials"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.medical-tests" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-circle"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.mental" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-meh"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.dental" /></div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
