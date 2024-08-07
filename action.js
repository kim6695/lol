// 난수 생성
function rand(len){
    return Math.floor(Math.random() * (len));
};

// 주사위 초기화
function dice_init(){
    var dice_a_count = document.getElementById('dice_reft_count_1');
    dice_a_count.innerText = 3;
    var dice_b_count = document.getElementById('dice_reft_count_2');
    dice_b_count.innerText = 3;
}

// 챔피언 리스트
var champ = new Array(
    '가렌','갈리오','갱플랭크','그라가스','그레이브즈','그웬','나르','나미','나서스','노틸러스','녹턴','누누','니달리','니코','닐라',
    '다리우스','다이애나','드레이븐','라이즈','라칸','람머스','럭스','럼블','레나타','레넥톤','레오나','렉사이','렐','렝가','루시안',
    '룰루','르블랑','리신','리븐','리산드라','릴리아','마스터이','마오카이','말자하','말파이트','모데카이저','모르가나','문도','미스포춘',
    '바드','바루스','바이','베이가','베인','벡스','벨베스','벨코즈','볼리베어','브라움','브랜드','블라디미르','블리츠','비에고',
    '빅토르','뽀삐','사미라','사이온','사일러스','샤코','세나','세라핀','세주아니','세트','소나','소라카','쉔','쉬바나','스웨인','스카너',
    '시비르','신짜오','신드라','신지드','쓰레쉬','아리','아무무','아우렐리온 솔','아이번','아지르','아칼리','아크샨','아트록스','아펠리오스',
    '알리스타','애니','애니비아','애쉬','야스오','에코','엘리스','오공','오른','오리아나','올라프','요네','요릭','우디르','우르곳','워윅',
    '유미','이렐리아','이블린','이즈리얼','일라오이','자르반','자야','자이라','자크','잔나','잭스','제드','제라스','제리','제이스','조이',
    '직스','진','질리언','징크스','초가스','카르마','카밀','카사딘','카서스','카시오페아','카이사','카직스','카타리나','칼리스타','케넨',
    '케이틀린','케인','케일','코그모','코르키','퀸','크산테','클레드','키아나','킨드레드','타릭','탈론','탈리야','탐켄치','트런들',
    '트리스타나','트린다미어','트위스티드 페이트','트위치','티모','파이크','판테온','피들스틱','피오라','피즈','하이머딩거','헤카림','밀리오','나피리','브라이어','흐웨이','스몰더','오로라'
);

// 랜덤한 챔피언을 뽑아 리턴
function select_champ(space, count){
    var result = new Array();
    var idx = 0;
    while (result.length < count){
        var select = space[rand(space.length)];
        if (result.indexOf(select) == -1){
            result[idx] = select;
            idx++;
        };
    };
    return result;
};

// 숫자에 따라 html 구성
function make_list_html(person, selected_champ_list, team_name){
    var team_name = team_name.slice(-1);
    var result_html = "";
    for (var i=0; i<person;i++){
        var name = selected_champ_list[i];
        result_html += "<li><div class='img'><img width=70px height=70px src='./imgs/"+name+".jpg'></div><div class='champ_name'>"+name+"</div><button type='button' class='dice' id='"+team_name+i+"' onclick=dice_click(this)></button></li>";
    };
    return result_html;
}

// 팀 챔피언 구성
function view(champ_arr,person,team_name){
    // html로 출력
    var team = document.getElementById(team_name);
    team.innerHTML = make_list_html(person, champ_arr, team_name);
}

//footer
var f_newest = document.getElementById('f_newest');
f_newest.innerText = "챔피언 : "+champ.length+"개 (최신: "+champ[champ.length-1]+")";


// 초기 페이지 출력
var left_dice_count = 3;
var right_dice_count = 3;

var person = 6;

var chosen_champ = select_champ(champ, person*2);
var a_champs = chosen_champ.slice(0,person);
var b_champs = chosen_champ.slice(person);
view(a_champs,person,'team_a');
view(b_champs,person,'team_b');


// 입력값을 받으면 새로 반영
function user_setting_view(){
    const uesr_input_num = document.getElementById('champ_count').value;
    person = uesr_input_num;
    if (uesr_input_num > 10) {
        person = 10;
        var input = document.getElementById("champ_count");
        input.setAttribute('placeholder','10 이하');
    }
    chosen_champ = select_champ(champ, person*2);
    a_champs = chosen_champ.slice(0,person);
    b_champs = chosen_champ.slice(person);

    view(a_champs,person,'team_a');
    view(b_champs,person,'team_b');

    left_dice_count = 3;
    right_dice_count = 3;
    dice_init();
}

// 주사위 클릭하면
function dice_click(dice){
    var dice_team = dice.id.substr(0,1);
    var dice_num = dice.id.substr(1);
    
    while (true){
        new_champ = champ[rand(champ.length)];
        if (chosen_champ.indexOf(new_champ) == -1){
            chosen_champ.push(new_champ);
            break
        }
    }
    
    if (dice_team=='a'){
        if (left_dice_count > 0){
            a_champs[dice_num] = new_champ;
            left_dice_count--;
        } else {
            return;
        }
    } else {
        if (right_dice_count > 0){
            b_champs[dice_num] = new_champ;
            right_dice_count--;
        } else {
            return;
        }
    }

    view(a_champs,person,'team_a');
    view(b_champs,person,'team_b');

    var dice_a_count = document.getElementById('dice_reft_count_1');
    dice_a_count.innerText = left_dice_count;
    var dice_b_count = document.getElementById('dice_reft_count_2');
    dice_b_count.innerText = right_dice_count;
}

//팀 셔플
function shuffle_team(){
    const members = document.getElementById('shuffle_team').value;
    const mems_array = [...members];

    var arr = shuffleArray(mems_array);

    var len = mems_array.length / 2;

    mem_a = document.getElementById('mem_a');
    mem_b = document.getElementById('mem_b');

    var a_html = "";
    for(i=0;i<len;i++){
        a_html += "<p id='pp'>"+arr[i]+"</p>"
    };
    var b_html = "";
    for(i=len;i<len*2;i++){
        b_html += "<p id='pp'>"+arr[i]+"</p>"
    };
    mem_a.innerHTML = a_html;
    mem_b.innerHTML = b_html;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  