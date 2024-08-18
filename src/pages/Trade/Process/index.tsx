import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import nextArrowImg from '@/assets/common/nextArrow.svg';
import example1Img from '@/assets/trade/example1.png';
import example2Img from '@/assets/trade/example2.png';
import example3Img from '@/assets/trade/example3.png';
import { opacityVariants } from '@/constants/variants';
import styles from './styles.module.scss';

export default function TradeProcessPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <section className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>중개 프로세스</h1>
          <p>농가거래 걱정되시나요?</p>
          <p>주말내집이 중개 프로세스를 제안합니다.</p>
        </div>
      </section>
      <section className={styles.content}>
        <article>
          <h1>
            <strong>주말내집이 알려주는 중개 프로세스 요약 </strong>
          </h1>
          <div className={styles.summaryBox}>
            <p>1&nbsp;.&nbsp;&nbsp;등기부등본 내용 확인</p>
            <img src={nextArrowImg} alt="nextArrowButton" />
            <p>2&nbsp;.&nbsp;&nbsp;계약 체결</p>
            <img src={nextArrowImg} alt="nextArrowButton" />
            <p>3&nbsp;.&nbsp;&nbsp;부동산거래계약신고필증 발급</p>
            <img src={nextArrowImg} alt="nextArrowButton" />
            <p>4&nbsp;.&nbsp;&nbsp;소유권 이전 등기</p>
          </div>
        </article>
        <article>
          <h2>
            <strong>서비스 피해 보상</strong>
          </h2>
          <h3>
            주말내집은 부동산 중개행위를 하지 않으며 등록 및 열람으로 문제되는
            당사간의 거래에 관련한 모든 법적 책임을 지지않습니다.
          </h3>
          <div className={styles.box}>
            <h4>
              <strong>(1) 손해배상</strong>
            </h4>
            <ul className={styles.customUl}>
              <li>
                주말내집 서비스 이용과 관련하여 회원에게 발생한 어떠한 손해에
                대하여도 배상할 책임을 지지 않습니다.
              </li>
              <li>
                회원이 서비스를 이용함에 있어 행한 불법행위로 인하여 주말내집이
                당해 회원 이외의 제3자로부터 손해배상청구, 소송을 비롯한 각종의
                이의제기를 받는 경우 당해 회원은 주말내집의 면책을 위하여
                노력하여야 하며, 만일 주말내집이 면책되지 못한 경우는 당해
                회원은 그로 인하여 주말내집에 발생한 모든 손해를 배상하여야
                합니다.
              </li>
            </ul>
            <h4>
              <strong>(2) 면책사항</strong>
            </h4>
            <ul className={styles.customUl}>
              <li>
                주말내집은 천재지변 또는 이에 준하는 불가항력으로 인하여
                서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이
                면제됩니다.
              </li>
              <li>
                주말내집은 회원의 귀책사유로 인한 서비스의 이용 장애에 대하여
                책임을 지지 않습니다.
              </li>
              <li>
                주말내집은 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에
                대하여 책임을 지지 않으며, 그 밖에 서비스를 통하여 얻은 자료로
                인한 손해 등에 대하여도 책임을 지지 않습니다.
              </li>
              <li>
                주말내집은 회원이 게재한 정보, 자료, 사실의 신뢰도, 정확성 등
                내용에 대하여는 책임을 지지 않습니다.
              </li>
            </ul>
          </div>
        </article>
        <article>
          <h2>
            <strong>매매 계약 체결 전</strong>
          </h2>
          <ul>
            <h3>1. 등기부등본 내용확인</h3>
            <ul>
              <h4>(1) 등기부등본 갑구 내용 확인</h4>
              <ul>
                <li>
                  갑구에는 소유권 그리고 소유권과 관련된 권리 관계에 대한 사항이
                  기록되어 있습니다. 따라서, 소유권과 관련하여 등기를 한
                  목적뿐만 아니라 등기원인이 무엇인지 등에 대한 확인이
                  가능합니다. 마지막 부분을 통하여{' '}
                  <strong>현재 부동산 소유자를 확인</strong>할 수 있을 뿐만
                  아니라,{' '}
                  <strong>
                    소유권 외 소유권과 관련된 권리관계인 가등기, 가처분, 가압류,
                    경매 등과 같은 소유권에 영향을 미칠 수 있는 내용 여부를 확인
                  </strong>
                  해야 합니다.
                </li>
              </ul>
              <h4>(2) 등기부등본 을구 내용 확인</h4>
              <ul>
                <li>
                  을구에는 부동산등기부등본의 마지막이면서 가장 중요한 사항들이
                  담겨 있습니다. 소유권을 제외한 부동산에 대한 ‘권리 전부’를
                  확인할 수 있으며 , 부동산의 담보, 채무상황 등을 파악할 수
                  있습니다. 해당 부분에서는{' '}
                  <strong>
                    (근)저당권, 전세권, 지역권, 지상권등의 권리가 등기되어
                    있는지 여부를 확인
                  </strong>
                  해야 하며,{' '}
                  <strong>등기 이전 전에 소멸이 가능한지 확인</strong>을
                  해야합니다. 또한 이는{' '}
                  <strong>
                    매수자 측으로 명의가 넘어오기 전까지 변동사항을 확인
                  </strong>
                  해야 합니다.
                </li>
              </ul>
            </ul>
          </ul>
        </article>
        <article>
          <h2>
            <strong>매매 계약 체결 시</strong>
          </h2>
          <ul>
            <ul>
              <h4>(1) 계약 체결 과정</h4>
              <ul>
                <li>
                  1. 직접 대면으로 등기부등본 상의 소유자와 계약체결 당사자가
                  동일한지 신분증을 확인합니다.
                </li>
                <li>
                  2. 계약서 작성당일에도 등기부등본을 발급받아서 ‘부동산의
                  표시’를 확인합니다.
                  <ul style={{ marginBottom: '0' }}>
                    <li>
                      ✓ ‘부동산의 표시’ 부분은 등기부 등본을 참고하여 작성하며,
                      계약내용은 쌍방 합의된 매매대금, 계약금, 중도금, 잔금
                      금액과 날짜를 작성해야 합니다.
                    </li>
                  </ul>
                </li>
                <li>
                  3. 매수자는 매도자에게 계약금 입금을 한 후 게약서를 작성 한 후
                  1부씩 나눠 가집니다.
                </li>
              </ul>
              <h4>(2) 필요서류</h4>
              <ul>
                <li>
                  부동산 매매 계약서 2부, 부동산거래계약 신고서 1부, 등기부등본
                  1부, 도장
                </li>
              </ul>
              <h4>(3) 문서 예시 이미지</h4>
              <ul className={styles.imageUl}>
                <li>
                  <img src={example1Img} alt="exampleImage1" />
                </li>
                <li>
                  <img src={example2Img} alt="exampleImage2" />
                </li>
                <li>
                  <img src={example3Img} alt="exampleImage3" />
                </li>
              </ul>
            </ul>
          </ul>
        </article>
        <article>
          <h2>
            <strong>매매 계약 체결 후</strong>
          </h2>
          <ul>
            <h3>1. 부동산거래계약신고필증 발급</h3>
            <ul>
              <h4>(1) 신고 방법</h4>
              <ul>
                <li>
                  법무사에 따라 소유권 등기 이전 시 함께 대행하기도하지만
                  매수자가 직접 하는 것도 가능합니다.
                </li>
              </ul>
            </ul>
          </ul>
          <div className={styles.box}>
            <h4>
              <strong>(1) 매수자가 직접 할 경우</strong>
            </h4>
            <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
              <li>
                국토교통부 부동산 거래관리 시스템 접속, 매수인 공인인증서로 작성
                가능합니다.
              </li>
              <li>물건 관할지 구청에서 직접 신청 가능합니다.</li>
            </ul>
          </div>
          <ul>
            <ul>
              <h4>(2) 신고 기간</h4>
              <ul>
                <li>
                  거래계약일 30일 이내여야 합니다. 만약 신고 기간을 넘기게
                  된다면 과태료가 부과됩니다.
                </li>
                <ul>
                  <li>
                    ✓ 잔금 지급 전 등기부등본 다시 재발급하여 중요한 권리 변동이
                    있는지 반드시 확인하여야 합니다.
                  </li>
                </ul>
                <li />
              </ul>
            </ul>
            <h3>2. 소유권 이전 등기</h3>
            <ul>
              <h4>(1) 등기 신청 기간</h4>
              <ul>
                <li>
                  잔금일로부터 60일 이내 취득세를 신고하고 소유권 이전등기
                  신청을 마쳐야 합니다.
                </li>
                <ul>
                  <li>
                    ✓ 60일 이내 취득세 신고를 하지 않을 경우 취득세액의 20%에
                    해당하는 가산세를 납부해야 하고, 기간 내 이전 등기를 하지
                    않으면 부동산등기 특별조치법상 부동산등기해태 과태료를
                    납부해야 합니다.
                  </li>
                </ul>
              </ul>
              <h4>(2) 필요 서류</h4>
              <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
                <li>
                  매도인 : 부동산 매도용 인감증명서, 인감도장, 등기필증 또는
                  등기필정보(등기권리증), 주민등록초본
                </li>
                <li>매수인 : 주민등록초본, 가족관계증명서, 주민등록증, 도장</li>
              </ul>
              <h4>(3) 신고 방법</h4>
              <ul>
                <li>법무사에게 위임이 가능합니다.</li>
                <li>부동산 관할 등기소에 방문해 직접 등기도 가능합니다.</li>
              </ul>
            </ul>
          </ul>
          <div className={styles.box}>
            <h4>
              <strong>직접 등기가 불가능한 경우</strong>
            </h4>
            <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
              <li>
                매수인이 은행에서 잔금 대출을 받아, 매수와 동시에 근저당권이
                설정되어 있는 경우 불가능합니다.
              </li>
              <li>매도인이 등기권리증을 분실한 경우 불가능합니다.</li>
              <li>
                그 외 권리관계나 세금 등이 복잡하여 일반인이 처리하기 어려운
                경우 불가능합니다.
              </li>
            </ul>
          </div>
          <ul>
            <ul>
              <h4>(4) 소유권 등기이전 처리가 어려운 경우</h4>
              <ul>
                <li>
                  매도인에게 근저당권부 채무가 있는 경우에
                  불가능합니다.매수인으로부터 잔금을 받고 채무를 변제해야 완료
                  가능합니다.
                </li>
                <li>
                  등기권리증 분실할 경우에 불가능합니다.하지만, 법무소 사무소에
                  연락하면 확인서면을 준비해 주기 때문 없어도 진행이 가능합니다.
                </li>
              </ul>
            </ul>
          </ul>
        </article>
        <button type="submit" onClick={() => navigate(-1)}>
          원래 페이지로 돌아가기
        </button>
      </section>
    </motion.div>
  );
}
