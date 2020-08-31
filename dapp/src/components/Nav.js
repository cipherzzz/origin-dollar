import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fbt } from 'fbt-runtime'

import withIsMobile from 'hoc/withIsMobile'

import AccountStatus from 'components/AccountStatus'
import LanguageOptions from 'components/LanguageOptions'
import LanguageSelected from 'components/LanguageSelected'
import LocaleDropdown from 'components/LocaleDropdown'

import Languages from '../constants/Languages'

const docsURL = process.env.DOCS_URL
const launched = process.env.LAUNCHED
const environment = process.env.NODE_ENV

const Nav = ({ dapp, isMobile, locale, onLocale }) => {
  const { pathname } = useRouter()

  return (
    <>
      {!dapp &&
        <>
          <div className="triangle d-none d-xl-block"></div>
          <div className="banner d-flex align-items-center justify-content-center text-white">
            {
              fbt(
                `Currently earning ${fbt.param('APY', '15.34%')} APY`,
                'Current APY banner'
              )
            }
          </div>
        </>
      }
      <nav className={classnames('navbar navbar-expand-lg', { dapp })}>
        <div className="container p-lg-0">
          <Link href={dapp ? '/dapp' : '/'}>
            <a className="navbar-brand">
              <img
                src={
                  dapp
                    ? '/images/ousd-logo-blue.svg'
                    : '/images/ousd-logo-white.svg'
                }
                alt="Origin Dollar logo"
                loading="lazy"
              />
            </a>
          </Link>
          <button
            className="navbar-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#langLinks"
            aria-controls="langLinks"
            aria-expanded="false"
            aria-label="Toggle language navigation"
          >
            <div className="dropdown-marble">
              <LanguageSelected
                locale={locale}
                theme={dapp ? 'light' : 'dark'}
              />
            </div>
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navLinks"
            aria-controls="navLinks"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img
              src={`/images/menu-icon-${dapp ? 'dark' : 'light'}.svg`}
              alt="Nav menu"
              loading="lazy"
            />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="langLinks"
          >
            <button
              className="close navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#langLinks"
              aria-controls="langLinks"
              aria-expanded="false"
              aria-label="Toggle language navigation"
            >
              <img src="/images/close.svg" alt="Close icon" loading="lazy" />
            </button>
            <LanguageOptions locale={locale} onLocale={onLocale} />
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navLinks"
          >
            <button
              className="close navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navLinks"
              aria-controls="navLinks"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src="/images/close.svg" alt="Close icon" loading="lazy" />
            </button>
            {!dapp && (
              <ul className="navbar-nav">
                <li
                  className={classnames('nav-item', {
                    active: pathname === '/',
                  })}
                >
                  <Link href="/">
                    <a className="nav-link">
                      {fbt('Home', 'Home page link')} <span className="sr-only">(current)</span>
                    </a>
                  </Link>
                </li>
                <li
                  className={classnames('nav-item', {
                    active: pathname === '/earn',
                  })}
                >
                  <Link href="/earn">
                    <a className="nav-link">{fbt('Earn Yields', 'Earn page link')}</a>
                  </Link>
                </li>
                <li
                  className={classnames('nav-item', {
                    active: pathname === '/governance',
                  })}
                >
                  <Link href="/governance">
                    <a className="nav-link">{fbt('Governance', 'Governance page link')}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href={docsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    {fbt('Docs', 'Documentation link')}
                  </a>
                </li>
              </ul>
            )}
            {dapp && environment !== 'production' && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/dapp/dashboard">
                    <a>{fbt('Debug Dashboard', 'Debugging dashboard link')}</a>
                  </Link>
                </li>
              </ul>
            )}
            <div className="d-flex flex-column flex-lg-row">
              <LocaleDropdown
                theme={dapp ? 'light' : 'dark'}
                locale={locale}
                onLocale={onLocale}
                className="nav-dropdown"
                useNativeSelectbox={false}
              />
              {launched && <AccountStatus className="ml-2" />}
              {!launched && (
                <a
                  href={docsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn learn-more"
                >
                  {fbt('Learn More', 'Learn more button')}
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .banner {
          background-color: #2f424e;
          font-size: 0.8125rem;
          height: 40px;
          position: absolute;
          top: -40px;
          width: 100%;
          z-index: 1;
        }
        .navbar {
          padding: 0;
          font-size: 0.8125rem;
          margin-top: 40px;
          z-index: 2;
        }
        .navbar.dapp {
          margin-top: 0;
        }
        .navbar:not(.dapp) a {
          color: white;
        }
        .navbar a {
          text-decoration: none;
        }
        .navbar a:hover {
          opacity: 0.8;
        }
        .navbar .container {
          margin-top: 30px;
        }
        .navbar-toggler {
          margin-left: 20px;
          padding-left: 0;
          padding-right: 0;
        }
        .navbar-toggler:focus {
          border: none;
          outline: none;
          opacity: 0.8;
        }
        .nav-item {
          align-items: center;
          display: flex;
          margin-right: 40px;
        }
        .debug {
          position: absolute;
          top: 0;
          right: 0;
        }
        .learn-more {
          border-radius: 16px;
          border: solid 1px white;
          color: white;
          font-size: 0.8125rem;
          margin-left: 10px;
        }

        @media (max-width: 992px) {
          .container {
            padding-left: 30px;
            padding-right: 30px;
          }
          .navbar-collapse {
            background: white;
            font-size: 1.5rem;
            position: fixed;
            left: 100%;
            padding: 74px 30px;
            height: 9999px;
            width: 256px;
            transition: all 0.3s ease;
            display: block;
            top: 0;
          }
          .navbar-collapse.collapsing {
            transition: all 0.3s ease;
            display: block;
          }
          .navbar-collapse.show {
            left: calc(100% - 256px);
          }
          .navbar:not(.dapp) a {
            color: black;
          }

          .close {
            background: none;
            border: none;
            position: absolute;
            top: 30px;
            right: 30px;
          }

          ul {
            position: relative;
            left: -30px;
            width: calc(100% + 30px);
          }

          .nav-item {
            font-size: 1.5rem;
            margin: 0 0 28px;
          }

          .nav-item.active {
            border-left: 5px solid black;
          }

          .nav-item:not(.active) {
            border-left: 5px solid white;
          }

          .nav-item .nav-link {
            line-height: 1;
            padding: 2px 0 2px 30px;
          }

          div.dropdown-marble {
            border-color: white;
            height: 24px;
            width: 24px;
          }
        }

        @media (min-width: 992px) {
          .navbar .nav-link {
            border: 1px solid transparent;
            padding-left: 0;
            padding-right: 0;
          }

          .navbar .nav-link:hover,
          .navbar .active .nav-link {
            border-bottom-color: white;
            opacity: 1;
          }

          #langLinks {
            display: none !important;
          }
        }

        @media (min-width: 1200px) {
          .triangle {
            position: absolute;
            top: 47px;
            left: calc((100vw - 1120px) / 2 + 232px);
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-right: 8px solid #2f424e;
            border-bottom: 6px solid transparent;
          }
          .banner {
            border-radius: 2px;
            top: 36px;
            height: 32px;
            left: calc((100vw - 1120px) / 2 + 240px);
            padding: 0 15px;
            width: initial;
          }
          .navbar {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  )
}

export default withIsMobile(Nav)
