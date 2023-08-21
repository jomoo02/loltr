export default function(id) {
    const url = 'https://ddragon.leagueoflegends.com/cdn/img/';
    if (!id) {
        return '';
    }
    let endOfUrl = '';

    // domination
    if (id === 8100) {
        endOfUrl = "perk-images/Styles/7200_Domination.png";
    }

    if (id === 8112) {
        endOfUrl = "perk-images/Styles/Domination/Electrocute/Electrocute.png";
    }
    if (id === 8124) {
        endOfUrl = "perk-images/Styles/Domination/Predator/Predator.png";
    } 
    if (id === 8128) {
        endOfUrl = "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png";
    }
    if (id === 9923) {
        endOfUrl = "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png";
    }
    
    if (id === 8126) {
        endOfUrl = "perk-images/Styles/Domination/CheapShot/CheapShot.png";
    }
    if (id === 8139) {
        endOfUrl = "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png";
    }
    if (id === 8143) {
        endOfUrl = "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png";
    }

    if (id === 8136) {
        endOfUrl = "perk-images/Styles/Domination/ZombieWard/ZombieWard.png";
    }
    if (id === 8120) {
        endOfUrl = "perk-images/Styles/Domination/GhostPoro/GhostPoro.png";
    }
    if (id === 8138) {
        endOfUrl = "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png";
    }

    if (id === 8135) {
        endOfUrl = "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png";
    }
    if (id === 8134) {
        endOfUrl = "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png";
    }
    if (id === 8105) {
        endOfUrl = "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png";
    }
    if (id === 8106) {
        endOfUrl = "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png";
    }

    // Inspriration
    if (id === 8300) {
        endOfUrl = "perk-images/Styles/7203_Whimsy.png";
    }

    if (id === 8351) {
        endOfUrl = "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png";
    }
    if (id === 8360) {
        endOfUrl = "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png";
    }
    if (id === 8369) {
        endOfUrl = "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png";
    }

    if (id === 8306) {
        endOfUrl = "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png";
    }
    if (id === 8304) {
        endOfUrl = "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png";
    }
    if (id === 8313) {
        endOfUrl = "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png";
    }

    if (id === 8321) {
        endOfUrl = "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png";
    }
    if (id === 8316) {
        endOfUrl = "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png";
    }
    if (id === 8345) {
        endOfUrl = "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png";
    }

    if (id === 8347) {
        endOfUrl = "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png";
    }
    if (id === 8410) {
        endOfUrl = "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png";
    }
    if (id === 8352) {
        endOfUrl = "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png";
    }

    // Precision
    if (id === 8000) {
        endOfUrl = "perk-images/Styles/7201_Precision.png";
    }
    
    if (id === 8005) {
        endOfUrl = "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png";
    }
    if (id === 8008) {
        endOfUrl = "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png";
    }
    if (id === 8021) {
        endOfUrl = "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png";
    }
    if (id === 8010) {
        endOfUrl = "perk-images/Styles/Precision/Conqueror/Conqueror.png";
    }

    if (id === 9101) {
        endOfUrl = "perk-images/Styles/Precision/Overheal.png";
    }
    if (id === 9111) {
        endOfUrl = "perk-images/Styles/Precision/Triumph.png";
    }
    if (id === 8009) {
        endOfUrl = "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png";
    }

    if (id === 9104) {
        endOfUrl = "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png";
    }
    if (id === 9105) {
        endOfUrl = "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png";
    }
    if (id === 9103) {
        endOfUrl = "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png";
    }

    if (id === 8014) {
        endOfUrl = "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png";
    }
    if (id === 8017) {
        endOfUrl = "perk-images/Styles/Precision/CutDown/CutDown.png";
    }
    if (id === 8299) {
        endOfUrl = "perk-images/Styles/Sorcery/LastStand/LastStand.png";
    }

    // Resolve
    if (id === 8400) {
        endOfUrl = "perk-images/Styles/7204_Resolve.png";
    }

    if (id === 8437) {
        endOfUrl = "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png";
    }
    if (id === 8439) {
        endOfUrl = "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png";
    }
    if (id === 8465) {
        endOfUrl = "perk-images/Styles/Resolve/Guardian/Guardian.png";
    }

    if (id === 8446) {
        endOfUrl = "perk-images/Styles/Resolve/Demolish/Demolish.png";
    }
    if (id === 8463) {
        endOfUrl = "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png";
    }
    if (id === 8401) {
        endOfUrl = "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png";
    }

    if (id === 8429) {
        endOfUrl = "perk-images/Styles/Resolve/Conditioning/Conditioning.png";
    }
    if (id === 8444) {
        endOfUrl = "perk-images/Styles/Resolve/SecondWind/SecondWind.png";
    }
    if (id === 8473) {
        endOfUrl = "perk-images/Styles/Resolve/BonePlating/BonePlating.png"
    }

    if (id === 8451) {
        endOfUrl = "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png"
    }
    if (id === 8453) {
        endOfUrl = "perk-images/Styles/Resolve/Revitalize/Revitalize.png"
    }
    if (id === 8242) {
        endOfUrl = "perk-images/Styles/Sorcery/Unflinching/Unflinching.png";
    }

    // Sorcery
    if (id === 8200) {
        endOfUrl = "perk-images/Styles/7202_Sorcery.png";
    }

    if (id === 8214) {
        endOfUrl = "perk-images/Styles/Sorcery/SummonAery/SummonAery.png";
    }
    if (id === 8229) {
        endOfUrl = "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png"
    }
    if (id === 8230) {
        endOfUrl = "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png";
    }

    if (id === 8224) {
        endOfUrl = "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png";
    }
    if (id === 8226) {
        endOfUrl = "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png";
    }
    if (id === 8275) {
        endOfUrl = "perk-images/Styles/Sorcery/NimbusCloak/6361.png";
    }

    if (id === 8210) {
        endOfUrl = "perk-images/Styles/Sorcery/Transcendence/Transcendence.png";
    }
    if (id === 8234) {
        endOfUrl = "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png";
    }
    if (id === 8233) {
        endOfUrl = "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png"
    }

    if (id === 8237) {
        endOfUrl = "perk-images/Styles/Sorcery/Scorch/Scorch.png";
    }
    if (id === 8232) {
        endOfUrl = "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png";
    }
    if (id === 8236) {
        endOfUrl = "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png";
    }

    return url + endOfUrl;
}