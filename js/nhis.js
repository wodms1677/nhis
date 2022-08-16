(function($){
   
    const nhis = {
        init:function(){
            this.header();
            this.main();
            this.footer();
        },
        header:function(){
            $('.main-menu-btn').on({
                mouseenter:function(){                    
                    $('.menu-bg').stop().slideDown(0);
                    $('.sub-menu').stop().slideDown(0);
                    $('.main-menu-btn').removeClass('on');
                    $(this).addClass('on');
                    $('.sub-menu').removeClass('on');
                    $(this).next().addClass('on');
                }
            });

            $('.sub-menu').on({
                mouseenter:function(){
                    $('.main-menu-btn').removeClass('on');
                    $(this).prev().addClass('on');
                    $('.sub-menu').removeClass('on');
                    $(this).addClass('on');
                }
            });

            $('.menu-wrap').on({
                mouseleave:function(){
                    $('.menu-bg').stop().slideUp(0);
                    $('.sub-menu').stop().slideUp(0);
                    $('.main-menu-btn').removeClass('on');
                    $('.sub-menu').removeClass('on');
                }
            })
       
        },
        main:function(){
            // indexOkBtn 눌렀을 때 동의안함이 1개 이상이면 넘어가지 않음
            $('#indexOkBtn').on({
                click:function(e){     
                    if(!$('.agree-chk-btn').is(':checked')){
                        e.preventDefault();
                        alert('국민건강보험공단 홈페이지 회원 약관에 동의하셔야 회원가입이 가능합니다.')
                        return;
                    }
                    else{
                        if( $('#agreeChkBtn2').is(':checked') || $('#agreeChkBtn4').is(':checked') || $('#agreeChkBtn6').is(':checked')){
                            e.preventDefault();
                            alert('모든 항목에 동의하셔야 회원가입이 가능합니다.');
                            return;                        
                        }
                        else{
                            location.href='./index.html'
                        }
                    }                               
                }
            })
            // 사업장 확인버튼 누르면 모달 열고 닫기 버튼 누르면 없어짐
            $('.how-chk-btn').on({  
                click:function(){
                    $('#modal').show();
                }
            });

            $('.modal-close-btn').on({
                click:function(){                    
                    $('#modal').hide();
                }
            })
            // 아이디 : 6자 이상 입력하면 버튼이 나타남. 영문 숫자 필수, 6자 이상 10자 이내            
            $('#id').on({
                keyup:function(e){
                    e.preventDefault();                    
                    var idValue=$(this).val();
                    var regExp=/[A-Za-z0-9]{6,}/g;
                    if(regExp.test(idValue)){
                        $('.id-chk-btn').addClass('on');
                    }
                    else{
                        $('.id-chk-btn').removeClass('on');
                    }                
                }
            });

            $('.id-chk-btn').on({
                click:function(e){
                e.preventDefault();
                var idValue=$('#id').val();
                var regExp=/(?=.*[A-Za-z])+(?=.*[0-9])+[A-Za-z0-9]{6,}/g;
                    if(idValue!==''){
                        if(regExp.test(idValue)){
                            alert('확인되었습니다.')
                        }
                        else{
                            alert('아이디 형식이 잘못되었습니다.');
                        }
                    }
                }
            });

            // 비밀번호 : 영문 숫자 특수문자(!@#$) 필수, 9자 이상 12자 이내
            $('#pw').on({
                focusout:function(e){
                    e.preventDefault();
                    var pwValue=$(this).val();
                    var regExp=/(?=.*[A-Za-z])+(?=.*\d)+(?=.*[!@#$])+[A-Za-z\d!@#$]{9,}/;
                        if(pwValue!==''){
                        if(regExp.test(pwValue)){
                            alert('사용 가능한 비밀번호입니다.');
                        }
                        else{
                            alert('비밀번호 형식이 잘못되었습니다.');
                        }
                        }
                }
            });
            // 비밀번호 분실 질문 상자
            $('#pwAsk').on({
                change:function(){
                    if($(this).val()==='직접 입력'){
                        $('#pwAnswerSelf').show();
                        $('.pw-ask').addClass('on')
                        $('.pw-ask span').addClass('on')
                    }
                    else{
                        $('#pwAnswerSelf').hide();
                        $('.pw-ask').removeClass('on')
                        $('.pw-ask span').removeClass('on')
                    }
                }
            });

            // 전화번호 : 하이픈 없이 숫자만 11자리
            $('#phoneNumber').on({
                keyup:function(e){
                    e.preventDefault();
                    var phoneValue=$(this).val();
                    var regExp1=/[^0-9]/;
                        $(this).val( phoneValue.replace(regExp1,''));
                },
                focusout:function(e){
                    e.preventDefault();
                    var phoneValue=$(this).val();
                    var regExp2=/^01[0|1|6|7|8|9]+\d{3,4}\d{4}$/g;
                        if(phoneValue!==''){
                            if(regExp2.test(phoneValue)){
                                alert('확인되었습니다.');
                            }
                            else{
                                alert('전화번호 형식이 잘못되었습니다.');
                            }
                        }
                }
            });
            // 팩스번호 : 하이픈 없이 숫자만 9자리
            $('#fax').on({
                keyup:function(e){
                    e.preventDefault();
                    var faxValue=$(this).val();
                    var regExp1=/[^0-9]/;
                        $(this).val( faxValue.replace(regExp1,''));
                }
            });
            // 이메일 1: 영문 필수 숫자 특수문자 선택
            $('#email1').on({
                focusout:function(e){
                    e.preventDefault();
                    var email1Value=$(this).val();
                    var regExp=/([A-Za-z])([-_\.]?[A-Za-z0-9])*/g;
                        if(email1Value!==''){
                            if(regExp.test(email1Value)){
                                $('#email2').focus();
                            }
                            else{
                                alert('이메일 형식이 올바른지 확인해주세요.');
                            }
                        }
                }
            });
            // 이메일 2: . 필수, 뒤에 영어 2-3자리
            $('#email2').on({
                focusout:function(e){
                    e.preventDefault();
                    var email2Value=$(this).val();
                    var regExp=/[A-Za-z]([\._-]?[A-Za-z]*)*\.[A-Za-z]{2,3}$/g;
                        if(email2Value!==''){
                            if(regExp.test(email2Value)){
                                alert('확인되었습니다');
                            }
                            else{
                                alert('이메일 형식이 올바른지 확인해주세요.');
                            }
                        }
                }
            });
            // 셀렉트박스: 선택값을 input에 적용
            $('#email').on({
                change:function(){
                    $('#email2').val($(this).val())
                }
            });
        },
        footer:function(){

        }
    }
    nhis.init();

})(jQuery);