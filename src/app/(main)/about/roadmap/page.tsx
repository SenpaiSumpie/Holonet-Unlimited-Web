import Link from 'next/link';

const RoadmapPage = () => {
    return (
        <div className="container flex items-center justify-center pt-8 pb-8 flex-grow">
            <ol className="w-full relative border-l border-gray-200 dark:border-gray-300">
                <li className="mb-5 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-300"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        October 2023 - TBD
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Application Launch 🥳
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Launch webpage on the internet (
                        <span className="font-bold text-green-400">
                            COMPLETED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Connect users to application to save decks (
                        <span className="font-bold text-green-400">
                            COMPLETED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Load Card Data{' '}
                        <Link
                            href="/cards/sor"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            EXAMPLE
                        </Link>{' '}
                        (
                        <span className="font-bold text-green-400">
                            COMPLETED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Create Easier Way to Create Sets and Cards (
                        <span className="font-bold text-yellow-400">
                            IN PROGRESS
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Allow Users to Search Cards (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Create Way for Users to make Decks (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                </li>
                <li className="mb-5 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-300"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        TBD
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Features and Improvements 🛠
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - View Card Sets (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Create Public and Private Decks (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Log Tournament Decks (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Use Modern AI to Generate Decks (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Add Most Played Statistics (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Add Meta Results (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>

                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Manage Website Users Giving Varying Permissions (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Collection Management (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Imperial Deck Testing (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - How To Play Section (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Content Creator Community List (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Mobile Support (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        ... and more!
                    </p>
                </li>
                <li className="mb-5 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-300"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        March 8th, 2024
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Game Release! 🎉
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Hopefully I have most of these features completed! 🤞
                    </p>
                </li>
                <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-300"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        March 8th, 2024 - TBD
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Post Game Release
                    </h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Implement stats tracker for win/lose against decks(
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Integrate TCGPlayer Market to track card prices (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        - Create playable web version to get better stat
                        tracking (
                        <span className="font-bold text-red-400">
                            NOT STARTED
                        </span>
                        )
                    </p>
                </li>
            </ol>
        </div>
    );
};

export default RoadmapPage;
